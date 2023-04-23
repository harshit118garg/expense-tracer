export const wait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 3500));

// fetch data from LocalStorage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// storing budgets info into localstorage
export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
  };
  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

export const createExpense = ({ name, amount, budgetID }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetID: budgetID,
  };
  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

export const formatDateToLocaleString = (str) =>
  new Date(str).toLocaleDateString();

//delete item
export const deleteItem = ({ key }) => {
  return localStorage.removeItem(key);
};

export const formatCurrency = (amount) => {
  return amount.toLocaleString(undefined, {
    style: "currency",
    currency: "INR",
  });
};

export const calculateSpentAmount = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    if (expense.budgetID !== budgetId) return acc;
    return (acc += expense.amount);
  }, 0);
  return budgetSpent;
};
