import { neon } from '@netlify/neon'

export default async (req, context) => {
    const body = await req.json();

    if (req.method === "POST") {
        if (body.action == "create") {
            try {
                const user = await getUser(body.username);
                if (user) {
                    return new Response(JSON.stringify({ error: "Username already exists" }), { status: 409 });
                }
            } catch (error) {
                console.error("Error checking user:", error);
                return new Response(JSON.stringify({ error: error.message }), { status: 500 });
            }

            try {
                await addUser(body.username);
                return new Response(JSON.stringify({ message: "User added successfully" }), { status: 201 });
            } catch (error) {
                console.error("Error adding user:", error);
                return new Response(JSON.stringify({ error: error.message }), { status: 400 });
            }

        } else if (body.action == "getUser") {
            const userId = body.user_id || context.cookies.get("user_id");
            const username = body.username || "";

            try {
                const user = await getUser(username, userId);
                return new Response(JSON.stringify(user), { status: 200 });
            } catch (error) {
                console.error("Error fetching user:", error);
                return new Response(JSON.stringify({ error: error.message }), { status: 500 });
            }
        } else if (body.action == "addIngredient") {
            const userId = context.cookies.get("user_id");
            if (!userId) {
                return new Response(JSON.stringify({ error: "User not logged in" }), { status: 401 });
            }

            try {
                const item = await addToPantry(userId, body.ingredient);
                return new Response(JSON.stringify(item), { status: 201 });
            } catch (error) {
                console.error("Error adding item to pantry:", error);
                return new Response(JSON.stringify({ error: error.message }), { status: 400 });
            }
        } else if (body.action == "getPantry") {
            const userId = context.cookies.get("user_id");
            if (!userId) {
                return new Response(JSON.stringify({ error: "User not logged in" }), { status: 401 });
            }

            try {
                const pantryItems = await getPantry(userId);
                return new Response(JSON.stringify(pantryItems), { status: 200 });
            } catch (error) {
                console.error("Error fetching pantry items:", error);
                return new Response(JSON.stringify({ error: error.message }), { status: 500 });
            }
        } else if (body.action == "removeIngredient") {
            const userId = context.cookies.get("user_id");
            if (!userId) {
                return new Response(JSON.stringify({ error: "User not logged in" }), { status: 401 });
            }

            try {
                const result = await removeFromPantry(userId, body.ingredient_id);
                return new Response(JSON.stringify(result), { status: 200 });
            } catch (error) {
                console.error("Error removing item from pantry:", error);
                return new Response(JSON.stringify({ error: error.message }), { status: 400 });
            }
        } else if (body.action == "clearPantry") {
            const userId = context.cookies.get("user_id");
            if (!userId) {
                return new Response(JSON.stringify({ error: "User not logged in" }), { status: 401 });
            }

            try {
                const result = await clearPantry(userId);
                return new Response(JSON.stringify(result), { status: 200 });
            } catch (error) {
                console.error("Error clearing pantry:", error);
                return new Response(JSON.stringify({ error: error.message }), { status: 500 });
            }
        } else if (body.action == "toggleInclude") {
            const userId = context.cookies.get("user_id");
            if (!userId) {
                return new Response(JSON.stringify({ error: "User not logged in" }), { status: 401 });
            }

            try {
                const result = await toggleInclude(userId, body.ingredient_id);
                return new Response(JSON.stringify(result), { status: 200 });
            } catch (error) {
                console.error("Error toggling include status:", error);
                return new Response(JSON.stringify({ error: error.message }), { status: 500 });
            }
        }


    } else {

        return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
    }

}

async function addUser(username) {
    const db = databaseConnection();
    if (username.length < 8 || username.length > 32) {
        throw new Error("Username must be between 8 and 32 characters long");
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        throw new Error("Username can only contain letters, numbers, and underscores");
    }

    console.log("Adding user:", username);

    return db("INSERT INTO users (username) VALUES ($1) RETURNING *", [username])
        .then(result => {
            return result[0];
        })
        .catch(error => {
            throw new Error("Database error: " + error.message);
        });
}

async function getUser(username="", user_id="") {
    const db = databaseConnection();

    if (!username && !user_id) {
        return null;
    }

    return db("SELECT * FROM users WHERE username = $1 OR user_id = $2", [username, user_id])
        .then(result => {
            if (result.length > 0) {
                return result[0]; // User exists
            } else {
                return null; // User does not exist
            }
        })
        .catch(error => {
            throw new Error("Database error: " + error.message);
        });
}

async function addToPantry(user_id, ingredient) {
    const db = databaseConnection();

    return db("INSERT INTO pantry (item_name, quantity, include, user_id) VALUES ($1, $2, $3, $4) RETURNING *", [ingredient.name, ingredient.quantity, ingredient.include, user_id])
        .then(result => {
            return result[0];
        })
        .catch(error => {
            throw new Error("Database error: " + error.message);
        });
}

async function getPantry(user_id) {
    const db = databaseConnection();

    return db("SELECT * FROM pantry WHERE user_id = $1", [user_id])
        .then(result => {
            return result; // Return all items in the user's pantry
        })
        .catch(error => {
            throw new Error("Database error: " + error.message);
        });
}

async function removeFromPantry(user_id, ingredient_id) {
    const db = databaseConnection();

    return db("DELETE FROM pantry WHERE user_id = $1 AND id = $2", [user_id, ingredient_id])
        .then(result => {
            return result;
        })
        .catch(error => {
            throw new Error("Database error: " + error.message);
        });
}

async function toggleInclude(user_id, ingredient_id) {
    const db = databaseConnection();

    return db("UPDATE pantry SET include = NOT include WHERE user_id = $1 AND id = $2 RETURNING *", [user_id, ingredient_id])
        .then(result => {
            if (result.length > 0) {
                return result[0]; // Return the updated item
            } else {
                throw new Error("Ingredient not found");
            }
        })
        .catch(error => {
            throw new Error("Database error: " + error.message);
        });
}

async function clearPantry(user_id) {
    const db = databaseConnection();

    return db("DELETE FROM pantry WHERE user_id = $1", [user_id])
        .then(result => {
            return result;
        })
        .catch(error => {
            throw new Error("Database error: " + error.message);
        });
}

function databaseConnection() {
    const dbString = Netlify.env.get("NETLIFY_DATABASE_URL");
    return neon(dbString);}