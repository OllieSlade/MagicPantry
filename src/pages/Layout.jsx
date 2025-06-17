import Header from "../components/sections/header"
import { Outlet, Link } from "react-router-dom";

const Layout = ({accountName}) => {
  return (
    <>
      <Header accountName={accountName} />

      <Outlet />
    </>
  )
};

export default Layout;