import React from "react";
import { Modal, Button, Stack } from "react-bootstrap";
import { useBudgets } from "../../contexts/BudgetsContext";
import { UNCATEGORIZED_BUDGET_ID } from "./../../contexts/BudgetsContext";
import SharedValues from "./../../shared/SharedValues";
import { currencyFormatter } from "./../../utils/utils";

export default function ViewExpensesModal({ budgetId, handleClose }) {
  const { budgets, deleteBudget, getBudgetExpenses, deleteExpense } =
    useBudgets();
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: SharedValues.UNCATEGORIZED, id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((budget) => budget.id === budgetId);
  const expenses = getBudgetExpenses(budgetId);
  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses - {budget?.name}</div>
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                variant="outline-danger"
                onClick={() => {
                  deleteBudget(budgetId);
                  handleClose();
                }}
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.map((expense) => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => deleteExpense(expense.id)}
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}