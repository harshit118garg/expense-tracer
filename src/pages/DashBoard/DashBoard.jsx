import React from "react";
import { useLoaderData, redirect } from "react-router-dom";
import { fetchData } from "../../helpers";
import Intro from "../../components/Intro/Intro";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";

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

  return (
    <>
      {userName ? (
        <Container className="bg-danger bg-gradient mt-4 h-100">
          <h2 className="display-3">
            Welcome Back{" "}
            <span className="text-white text-uppercase fw-bolder">
              {userName}
            </span>
          </h2>
        </Container>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default DashBoard;
