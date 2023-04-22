import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { logoutAction } from "./actions";
import "./App.scss";
import Error from "./Errors/Error";
import Main, { MainLayoutLoader } from "./Layouts/Main/Main";
import DashBoard, { DashBoardLoader } from "./pages/DashBoard/DashBoard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: MainLayoutLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <DashBoard />,
        loader: DashBoardLoader,
        errorElement: <Error />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
