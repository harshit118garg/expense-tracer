export const wait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 3500));

// generate random color
export const generateRandomColor = () => {
  const existingBudgetsLength = fetchData("budgets")?.length ?? 0;

  return `${existingBudgetsLength * 34} 65% 50%`;
};

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
    color: generateRandomColor(),
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

//delete item
export const deleteItem = ({ key }) => {
  return localStorage.removeItem(key);
};
