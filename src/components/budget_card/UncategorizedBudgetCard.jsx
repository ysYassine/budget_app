import React from "react";
import BudgetCard from "./BudgetCard";
import { useBudgets } from "../../contexts/BudgetsContext";
import SharedValues from "../../shared/SharedValues";

export default function UncategorizedBudgetCard(props) {
  const { getBudgetExpenses } = useBudgets();
  const amount = getBudgetExpenses(SharedValues.UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  );
  if (amount === 0) return null;
  return (
    <BudgetCard
      amount={amount}
      name={SharedValues.UNCATEGORIZED}
      {...props}
    ></BudgetCard>
  );
}
