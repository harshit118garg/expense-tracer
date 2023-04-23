import React from "react";
import { Container, Stack, Button, Row, Col } from "react-bootstrap";
import { useLoaderData, useNavigate, redirect } from "react-router-dom";
import {
  deleteItem,
  getAllMatchingItems,
  wait,
  createExpense,
} from "../../helpers";
import BudgetItem from "../../components/BudgetItem/BudgetItem";
import { toast } from "react-toastify";
import AddExpenseForm from "../../components/AddExpenseForm/AddExpenseForm";
import ExpensesTable from "../../components/ExpensesTable/ExpensesTable";


export async function BudgetPageLoader({ params }) {
  const budgets = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  });

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetID",
    value: params.id,
  });

  if (!budgets[0]) {
    throw new Error("The budget you are trying to find doesn't exist");
  }

  return { budgets, expenses };
}

export async function BudgetPageAction({ request, params }) {
  await wait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "createnewExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetID: values.budgetSelected,
      });
      toast.success(
        `You have successfully created your expense ${values.newExpense}`,
        {
          autoClose: 3000,
          theme: "light",
        }
      );
    } catch (error) {
      toast.error("Something has happened", { autoClose: 3000 });
      throw new Error("There was a problem creating your expense");
    }
  }

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

  return redirect(`/`);
}

const BudgetPage = () => {
  const { budgets, expenses } = useLoaderData();
  const budget = budgets[0];
  const navigate = useNavigate();

  return (
    <Container className="bg-secondary bg-gradient rounded-3 shadow-lg mt-4 h-100">
      <Stack direction="horizontal">
        <div className="head-info">
          <h2 className="display-3 text-center">
            <span className="text-light text-uppercase fw-bolder">
              {budget.name}{" "}
            </span>
            Overview
          </h2>
        </div>
        <div className="bck-btn ms-auto">
          <Button variant="dark" className="fs-4" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </Stack>
      <div className="line-break"></div>

      <div className="budget-overview">
        <Row xs={1} sm={1} lg={2} xl={2} md={1}>
          <Col>
            <div className="m-4">
              <BudgetItem budget={budget} showDeleteButton={true} />
            </div>
          </Col>
          <Col>
            <div className="create-budget-form m-4">
              <AddExpenseForm budgets={budgets} />
            </div>
          </Col>
        </Row>
      </div>
      {expenses && expenses.length > 0 && (
        <Container className="bg-info bg-gradient rounded-3 shadow-lg mt-4 h-100">
          {" "}
          <div className="budget-expenses">
            <div className="head-info">
              <h2 className="display-3 text-center">
                <span className="text-light text-uppercase fw-bolder">
                  {budget.name}{" "}
                </span>
                Expenses
              </h2>
            </div>
            <div className="line-break"></div>
            <ExpensesTable expenses={expenses} showBudget={false} />
          </div>
        </Container>
      )}
    </Container>
  );
};

export default BudgetPage;
