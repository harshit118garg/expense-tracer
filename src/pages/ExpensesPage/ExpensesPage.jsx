import React from "react";
import { Button, Container, Stack } from "react-bootstrap";
import { useLoaderData, useNavigate } from "react-router-dom";
import { fetchData } from "../../helpers";
import ExpensesTable from "../../components/ExpensesTable/ExpensesTable";

export function ExpensesPageLoader() {
  const expenses = fetchData("expenses");
  return { expenses };
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
