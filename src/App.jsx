import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { logoutAction } from "./actions";
import "./App.scss";
import Error from "./Errors/Error";
import Main, { MainLayoutLoader } from "./Layouts/Main/Main";
import DashBoard, {
  DashBoardAction,
  DashBoardLoader,
} from "./pages/DashBoard/DashBoard";
import ExpensesPage, {
  ExpensesPageAction,
  ExpensesPageLoader,
} from "./pages/ExpensesPage/ExpensesPage";

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
        action: DashBoardAction,
        errorElement: <Error />,
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: ExpensesPageLoader,
        action: ExpensesPageAction,
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
      <div className="App">
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
