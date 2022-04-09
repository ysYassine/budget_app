import "./BudgetCard.css";
import { currencyFormatter } from "./../../utils/utils";
import ProgressBar from "./../../../node_modules/react-bootstrap/esm/ProgressBar";
import { Button } from "react-bootstrap";

export default function BudgetCard({ name, amount, max, addExpenseCallBack }) {
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
        "budget-card" + (ratio > 1 ? " budget-card-expenses__overflow" : "")
      }
    >
      <div className="budget-card__header">
        <div className="card-name">{name}</div>
        <div className="amount">{currencyFormatter.format(amount)}&nbsp;</div>
        <div className="max">{" / " + currencyFormatter.format(max)}</div>
      </div>
      {
        <ProgressBar
          className="rounded-pill"
          variant={getProgressBarVarient(amount, max)}
          min={0}
          max={max}
          now={amount}
        ></ProgressBar>
      }
      <div className="card-buttons">
        <Button variant="outline-primary" onClick={addExpenseCallBack}>
          Add Expense
        </Button>
        <Button variant="outline-secondary">View Expenses</Button>
      </div>
    </div>
  );
}
