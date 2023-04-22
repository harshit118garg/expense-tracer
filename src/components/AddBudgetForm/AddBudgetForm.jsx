import React, { useEffect, useRef } from "react";
import { Button, Card } from "react-bootstrap";
import { FaRupeeSign } from "react-icons/fa";
import { useFetcher } from "react-router-dom";

const AddBudgetForm = () => {
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
    <>
      <Card className="bg-warning bg-gradient">
        <Card.Body>
          <Card.Title className="bg-info text-white text-center display-5">
            Create Budget
          </Card.Title>
          <fetcher.Form method="post" ref={formRef}>
            <div>
              <label htmlFor="newBudget" className="form-label fs-3">
                Budget Name
              </label>
              <input
                type="text"
                name="newBudget"
                id="newBudget"
                required
                className="form-control fs-4"
                placeholder="e.g.. Groceries, Travel, Shopping"
                ref={focusRef}
              />
            </div>
            <div>
              <label htmlFor="newBudgetAmount" className="form-label fs-3">
                Amount
              </label>
              <input
                type="number"
                name="newBudgetAmount"
                id="newBudgetAmount"
                required
                className="form-control fs-4"
                placeholder="e.g.. 1000Rs."
              />
            </div>
            <input type="hidden" name="_action" value="createNewBudget" />
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              className="fs-4"
            >
              {isSubmitting ? (
                "Creating Budget..."
              ) : (
                <>
                  <FaRupeeSign />
                  Create Budget
                </>
              )}
            </Button>
          </fetcher.Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default AddBudgetForm;
