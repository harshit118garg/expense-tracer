import React from "react";
import { useLoaderData } from "react-router-dom";
import { fetchData } from "../../helpers";

export function DashBoardLoader() {
  const userName = fetchData("userName");
  return { userName };
}

const DashBoard = () => {
  const { userName } = useLoaderData();

  return (
    <div>
      <h2 className="display-3 text-white">DashBoard {userName}</h2>
    </div>
  );
};

export default DashBoard;
