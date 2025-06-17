import { Outlet, Link } from "react-router-dom";

function Login() {
  const choices = ["./assets/img/1.jpg", "./assets/img/2.jpg", "./assets/img/3.jpg"];
  const image = choices[Math.floor(Math.random() * choices.length)];
  return (
    <section className="bg-pink h-[calc(100vh-72px)] flex justify-center items-center">
      
      <div className="flex flex-col md:flex-row border-grey border-2 rounded-md h-fit place-items-center md:w-1/2 w-2/3 bg-light-pink">
        <img src={image} alt="Random background" className="md:w-2/5" />
        <div className="md:px-16 md:w-3/5 px-8 py-8">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default Login;