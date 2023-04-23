import React from "react";
import { Stack, ProgressBar, Card, Button } from "react-bootstrap";
import { calculateSpentAmount, formatCurrency } from "../../helpers";
import { BsTrash } from "react-icons/bs";
import { Link, Form } from "react-router-dom";

const BudgetItem = ({ budget, showDeleteButton = false }) => {
  const { name, amount, id } = budget;
  const spentAmount = calculateSpentAmount(id);

  return (
    <>
      <Card className="bg-primary bg-gradient my-3 budget-card">
        <Card.Subtitle className="pt-3 px-3">
          <Stack direction="horizontal" gap={3}>
            <p className="fs-5 bg-light border rounded-1 px-2">{name}</p>
            <p className="fs-5 ms-auto bg-light border rounded-1 px-2">
              {formatCurrency(amount)} budgeted
            </p>
          </Stack>
        </Card.Subtitle>
        <Card.Body>
          <ProgressBar
            animated
            striped
            variant="danger"
            now={spentAmount}
            max={amount}
          />
          <Stack direction="horizontal" gap={3} className="my-4">
            <small className="fs-5 bg-light border rounded-1 px-2">
              {formatCurrency(spentAmount)} spent
            </small>
            <small className="fs-5 ms-auto bg-light border rounded-1 px-2">
              {formatCurrency(amount - spentAmount)} remaining
            </small>
          </Stack>
          <Stack>
            {showDeleteButton ? (
              <Form
                method="post"
                action="delete"
                onSubmit={(event) => {
                  if (
                    !confirm(
                      "Are you sure to delete this budget permanently...?"
                    )
                  ) {
                    event.preventDefault();
                  }
                }}
              >
                <Button type="submit" variant="warning" className="fs-4">
                  Delete Budget <BsTrash />
                </Button>
              </Form>
            ) : (
              <Link to={`/budget/${id}`}>
                <Button variant="warning" size="lg">
                  View Details
                </Button>
              </Link>
            )}
          </Stack>
        </Card.Body>
      </Card>
    </>
  );
};

export default BudgetItem;
