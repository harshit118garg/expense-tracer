import React from "react";
import { Button, Container, Stack } from "react-bootstrap";
import { useLoaderData, useNavigate, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import ExpensesTable from "../../components/ExpensesTable/ExpensesTable";
import { deleteItem, fetchData, wait } from "../../helpers";

export function ExpensesPageLoader() {
  const expenses = fetchData("expenses");
  return { expenses };
}

export async function ExpensesPageAction({ request }) {
  await wait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.deleteId,
      });
      toast.success(`You have successfully deleted your expense`, {
        autoClose: 3000,
        theme: "light",
      });
    } catch (error) {
      toast.error("Something has happened", { autoClose: 3000 });
      throw new Error("There was a problem deleting your expense");
    }
  }

  return redirect("/");
}

const ExpensesPage = () => {
  const navigate = useNavigate();
  const { expenses } = useLoaderData();

  return (
    <Container className="bg-warning bg-gradient rounded-3 shadow-lg mt-4 h-100">
      <Stack direction="horizontal">
        <div className="head-info">
          <h2 className="display-3 text-center">
            Your{" "}
            <span className="text-light text-uppercase fw-bolder">
              Expenses{" "}
            </span>
            <small className="fs-3 text-bg-danger px-2 rounded">
              ( {expenses.length} in total )
            </small>
          </h2>
        </div>
        <div className="bck-btn ms-auto">
          <Button variant="dark" className="fs-4" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </Stack>
      <div className="line-break"></div>
      <ExpensesTable
        expenses={expenses.sort((a, b) => b.createdAt - a.createdAt)}
      />
    </Container>
  );
};

export default ExpensesPage;
