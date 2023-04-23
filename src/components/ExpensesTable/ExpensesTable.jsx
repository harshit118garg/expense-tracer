import React from "react";
import { Table } from "react-bootstrap";
import ExpenseItem from "../ExpenseItem/ExpenseItem";

const ExpensesTable = ({ expenses, showBudget = true }) => {
  return (
    <Table striped hover bordered responsive className="my-3 expenses-table">
      <thead>
        <tr className="text-white">
          {[
            "Name",
            "Amount",
            "Date",
            showBudget ? "Budget" : null,
          ].map((i, index) => (
            <th key={index} className="text-center">
              {i}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr className="text-center" key={expense.id}>
            <ExpenseItem expense={expense} showBudget={showBudget} />
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ExpensesTable;
