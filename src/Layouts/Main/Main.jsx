import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { fetchData } from "../../helpers";
import Nav from "../../components/Navbar/Nav";

export function MainLayoutLoader() {
  const userName = fetchData("userName");
  return { userName };
}

const Main = () => {
  const { userName } = useLoaderData();
  return (
    <>
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Main;
