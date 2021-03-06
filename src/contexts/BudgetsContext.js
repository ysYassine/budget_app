import React, { useContext } from "react";
import { v4 as uuid } from "uuid";
import useLocalStorage from "./../Hooks/useLocalStorage";
import SharedValues from "./../shared/SharedValues";

const BudgetsContext = React.createContext();

export function useBudgets() {
  return useContext(BudgetsContext);
}

export default function BudgetsProvider({ children }) {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }

  function addBudget({ name, max }) {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name))
        return prevBudgets;
      return [...prevBudgets, { id: uuid(), name: name, max: max }];
    });
  }

  function deleteBudget(id) {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: SharedValues.UNCATEGORIZED_BUDGET_ID };
      })
    );
    setBudgets((prevBudgets) =>
      prevBudgets.filter((budget) => budget.id !== id)
    );
  }

  function addExpense({ description, amount, budgetId }) {
    setExpenses((prevExpenses) => {
      return [
        ...prevExpenses,
        {
          id: uuid(),
          description: description,
          amount: amount,
          budgetId: budgetId,
        },
      ];
    });
  }

  function deleteExpense(id) {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        addBudget,
        deleteBudget,
        expenses,
        getBudgetExpenses,
        addExpense,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
}
