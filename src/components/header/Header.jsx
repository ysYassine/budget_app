import "./Header.css";

import { Button } from "react-bootstrap";

export default function Header({ addBudgetCallBack, addExpenseCallBack }) {
  return (
    <>
      <div className="header">
        <h1>Budgets</h1>
        <Button variant="primary" onClick={() => addBudgetCallBack(true)}>
          Add budget
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => addExpenseCallBack(true)}
        >
          Add Expense
        </Button>
      </div>{" "}
    </>
  );
}
