import React from "react";
import { Stack, ProgressBar, Card, Button } from "react-bootstrap";
import { calculateSpentAmount, formatCurrency } from "../../helpers";
import { Link } from "react-router-dom";

const BudgetItem = ({ budget }) => {
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
            <Link to={`/budget/${id}`}>
              <Button variant="warning" size="lg">View Details</Button>
            </Link>
          </Stack>
        </Card.Body>
      </Card>
    </>
  );
};

export default BudgetItem;
