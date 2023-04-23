import React from "react";
import { Table } from "react-bootstrap";
import ExpenseItem from "../ExpenseItem/ExpenseItem";

const ExpensesTable = ({ expenses }) => {
  return (
    <Table striped hover responsive className="my-3 expenses-table">
      <thead>
        <tr className="bg-primary text-white">
          {["Name", "Amount", "Date", "Budget", "Delete"].map((i, index) => (
            <th key={index} className="text-center">
              {i}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr className="text-center" key={expense.id}>
            <ExpenseItem expense={expense} />
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ExpensesTable;
