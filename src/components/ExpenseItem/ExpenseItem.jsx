import React from "react";
import {
  formatCurrency,
  formatDateToLocaleString,
  getAllMatchingItems,
} from "../../helpers";
import { Link, useFetcher } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";

const ExpenseItem = ({ expense }) => {
  const { name, amount, id, createdAt, budgetID } = expense;

  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: budgetID,
  })[0];

  const fetcher = useFetcher();

  return (
    <>
      <td>{name}</td>
      <td>{formatCurrency(amount)}</td>
      <td>{formatDateToLocaleString(createdAt)}</td>
      <td>
        <Link to={`/budget/${budget.id}`}>
          <Button variant="dark" className="fs-3">
            {budget.name}
          </Button>
        </Link>
      </td>
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="deleteId" value={id} />
          <Button type="submit" variant="danger" className="fs-4">
            <BsTrash />
          </Button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
