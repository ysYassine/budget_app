import React from "react";
import BudgetCard from "./BudgetCard";
import { useBudgets } from "../../contexts/BudgetsContext";
import SharedValues from "./../../shared/SharedValues";

export default function TotalBudgetCard() {
  const { expenses, budgets } = useBudgets();
  const total = expenses.reduce((total, expense) => total + expense.amount, 0);
  if (total === 0) return null;
  const max = budgets.reduce((total, budget) => total + budget.max, 0);
  return (
    <BudgetCard
      amount={total}
      name={SharedValues.TOTAL}
      max={max}
      hideButtons={true}
    ></BudgetCard>
  );
}
