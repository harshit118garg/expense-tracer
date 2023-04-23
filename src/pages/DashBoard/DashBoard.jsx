import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import AddBudgetForm from "../../components/AddBudgetForm/AddBudgetForm";
import AddExpenseForm from "../../components/AddExpenseForm/AddExpenseForm";
import BudgetItem from "../../components/BudgetItem/BudgetItem";
import Intro from "../../components/Intro/Intro";
import { createBudget, createExpense, fetchData, wait } from "../../helpers";

export function DashBoardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses"); 
  return { userName, budgets, expenses };
}

export async function DashBoardAction({ request }) {
  await wait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      toast.success(
        `You have successfully created your account ${values.userName}`,
        {
          autoClose: 3000,
          theme: "light",
        }
      );
    } catch (error) {
      toast.error("Something has happened", { autoClose: 3000 });
      throw new Error("There was a problem creating your account");
    }
  }

  if (_action === "createNewBudget") {
    try {
      createBudget({ name: values.newBudget, amount: values.newBudgetAmount });
      toast.success(`You have successfully created your budget`, {
        autoClose: 3000,
        theme: "light",
      });
    } catch (error) {
      toast.error("Something has happened", { autoClose: 3000 });
      throw new Error("There was a problem creating your budget");
    }
  }

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

  return redirect("/");
}

const DashBoard = () => {
  const { userName, budgets, expenses } = useLoaderData();

  return (
    <>
      {userName ? (
        <>
          <Container className="bg-danger bg-gradient rounded-3 shadow-lg mt-4 h-100">
            <h2 className="display-3 text-center">
              Welcome Back{", "}
              <span className="text-white text-uppercase fw-bolder">
                {userName}
              </span>
            </h2>
            <div className="line-break"></div>
            {budgets && budgets.length > 0 ? (
              <>
                <Row xs={1} sm={2} lg={2} xl={2} md={2}>
                  <Col>
                    <div className="create-budget-form m-4">
                      <AddBudgetForm />
                    </div>
                  </Col>
                  <Col>
                    <div className="create-budget-form m-4">
                      <AddExpenseForm budgets={budgets} />
                    </div>
                  </Col>
                </Row>
                <Container className="bg-secondary bg-gradient rounded-3 shadow-lg my-4 h-100">
                  <div className="budgets-info">
                    <h2 className="display-3 text-center">
                      Existing{" "}
                      <span className="text-white text-uppercase fw-bolder">
                        Budgets
                      </span>
                    </h2>
                    <div className="line-break"></div>
                  </div>
                  <Row xs={1} sm={1} lg={3} xl={3} md={2}>
                    {budgets.map((budget) => {
                      return (
                        <Col key={budget.id}>
                          <BudgetItem budget={budget} />
                        </Col>
                      );
                    })}
                  </Row>
                </Container>
              </>
            ) : (
              <Row xs={1} sm={1} lg={1} xl={1} md={1}>
                <Col>
                  <div className="create-budget-form m-4">
                    <div className="bg-secondary bg-gradient">
                      <h3 className="text-white text-center display-2">
                        Take Control of&nbsp;
                        <span className="text-info fw-bold">Your Money</span>
                      </h3>
                      <blockquote className="blockquote text-white fs-3 text-center">
                        <p>
                          The simplest definition of a budget is “telling your
                          money where to go.“
                        </p>
                      </blockquote>
                    </div>
                    <AddBudgetForm />
                  </div>
                </Col>
              </Row>
            )}
          </Container>
        </>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default DashBoard;
