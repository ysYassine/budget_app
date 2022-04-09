import "./BudgetCard.css";
import { currencyFormatter } from "./../../utils/utils";
import ProgressBar from "./../../../node_modules/react-bootstrap/esm/ProgressBar";
import { Button } from "react-bootstrap";
import SharedValues from "./../../shared/SharedValues";

export default function BudgetCard({
  name,
  amount,
  max,
  addExpenseCallBack,
  hideButtons = false,
}) {
  const ratio = amount / max;
  function getProgressBarVarient(amount, max) {
    const ratio = amount / max;
    if (ratio < 0.5) return "primary";
    if (ratio < 0.75) return "warning";
    return "danger";
  }
  return (
    <div
      className={
        "budget-card" +
        (ratio > 1 ? " budget-card-expenses__overflow" : "") +
        (name === SharedValues.UNCATEGORIZED
          ? " budget-card-expenses__uncategorized"
          : "") +
        (name === SharedValues.TOTAL ? " budget-card-expenses__total" : "")
      }
    >
      <div className="budget-card__header">
        <div className="card-name">{name}</div>
        <div className="amount">{currencyFormatter.format(amount)}&nbsp;</div>
        {max && (
          <div className="max">{" / " + currencyFormatter.format(max)}</div>
        )}
      </div>
      {max && (
        <ProgressBar
          className="rounded-pill"
          variant={getProgressBarVarient(amount, max)}
          min={0}
          max={max}
          now={amount}
        ></ProgressBar>
      )}
      {!hideButtons && (
        <div className="card-buttons">
          <Button variant="outline-primary" onClick={addExpenseCallBack}>
            Add Expense
          </Button>
          <Button variant="outline-secondary">View Expenses</Button>
        </div>
      )}
    </div>
  );
}
