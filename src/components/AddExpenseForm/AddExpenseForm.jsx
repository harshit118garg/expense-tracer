import React, { useRef, useEffect } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { TbCoinRupee } from "react-icons/tb";
import { useFetcher } from "react-router-dom";

function AddExpenseForm({ budgets }) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <Card className="bg-warning bg-gradient">
      <Card.Body>
        <Card.Title className="bg-info text-white text-center display-5">
          Add New{" "}
          {budgets.length === 1 && `${budgets.map((budget) => budget.name)}`}{" "}
          Expense
        </Card.Title>
        <fetcher.Form method="post" ref={formRef}>
          <Row>
            <Col>
              <div>
                <label htmlFor="newExpense" className="form-label fs-3">
                  Expense Name
                </label>
                <input
                  type="text"
                  name="newExpense"
                  id="newExpense"
                  required
                  className="form-control fs-4"
                  placeholder="e.g.. Tea, Coffee"
                  ref={focusRef}
                />
              </div>
            </Col>
            <Col>
              <div>
                <label htmlFor="newExpenseAmount" className="form-label fs-3">
                  Amount
                </label>
                <input
                  type="number"
                  name="newExpenseAmount"
                  id="newExpenseAmount"
                  required
                  className="form-control fs-4"
                  placeholder="e.g.. 100Rs."
                />
              </div>
            </Col>
          </Row>
          <Row hidden={budgets.length === 1}>
            <Col>
              <div>
                <label htmlFor="budgetSelected" className="form-label fs-3">
                  Budget Category
                </label>
                <select
                  name="budgetSelected"
                  id="budgetSelected"
                  className="form-select fs-4"
                  required
                >
                  {budgets
                    .sort((a, b) => a.createdAt - b.createdAt)
                    .map((budget) => {
                      return (
                        <option key={budget.id} value={budget.id}>
                          {budget.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </Col>
          </Row>
          <input type="hidden" name="_action" value="createnewExpense" />
          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting}
            className="fs-4"
          >
            {isSubmitting ? (
              "Creating Expense..."
            ) : (
              <>
                <TbCoinRupee />
                Add Expense
              </>
            )}
          </Button>
        </fetcher.Form>
      </Card.Body>
    </Card>
  );
}

export default AddExpenseForm;
