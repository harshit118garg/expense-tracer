import { redirect } from "react-router-dom";
import { deleteItem, getAllMatchingItems } from "../helpers";
import { toast } from "react-toastify";

export async function logoutAction() {
  deleteItem({
    key: "userName",
  });
  deleteItem({
    key: "budgets",
  });
  deleteItem({
    key: "expenses",
  });
  toast.success("You have deleted your account!", {
    autoClose: 3000,
    theme: "dark",
  });
  return redirect("/");
}

export function deleteBudget({ params }) {
  deleteItem({
    key: "budgets",
    id: params.id,
  });

  const associatedExpenses = getAllMatchingItems({
    category: "expenses",
    key: "budgetID",
    value: params.id,
  });

  associatedExpenses.forEach((expense) => {
    deleteItem({
      key: "expenses",
      id: expense.id,
    });
  });

  toast.success("You have deleted your budget!", {
    autoClose: 3000,
    theme: "dark",
  });
  return redirect("/");
}
