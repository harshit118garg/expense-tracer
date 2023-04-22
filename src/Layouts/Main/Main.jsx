import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { fetchData } from "../../helpers";
import wave from "../../assets/wave.svg";
import Nav from "../../components/Navbar/Nav";

export function MainLayoutLoader() {
  const userName = fetchData("userName");
  return { userName };
}

const Main = () => {
  const { userName } = useLoaderData();
  return (
    <>
      <div className="App">
        <Nav userName={userName} />
        <main>
          <Outlet />
        </main>
      </div>
      <footer>
        <img src={wave} alt="wave" />
      </footer>
    </>
  );
};

export default Main;
