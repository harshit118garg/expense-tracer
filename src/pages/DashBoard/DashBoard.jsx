import React from "react";
import { useLoaderData, redirect } from "react-router-dom";
import { fetchData } from "../../helpers";
import Intro from "../../components/Intro/Intro";
import { toast } from "react-toastify";

export function DashBoardLoader() {
  const userName = fetchData("userName");
  return { userName };
}

export async function DashBoardAction({ request }) {
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  try {
    localStorage.setItem("userName", JSON.stringify(formData.userName));
    toast.success("You have successfully created your account", {
      autoClose: 3000,
      theme: "light",
    });
  } catch (error) {
    toast.error("Something has happened", { autoClose: 3000 });
    throw new Error("There was a problem creating your account");
  }
  return redirect("/");
}

const DashBoard = () => {
  const { userName } = useLoaderData();

  return <>{userName ? <p>{userName}</p> : <Intro />}</>;
};

export default DashBoard;
