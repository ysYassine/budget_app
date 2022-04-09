import "./Header.css";

import { Button } from "react-bootstrap";
import { useState } from "react";
import AddBudgetModal from "./../add_budget_modal/AddBudgetModal";

export default function Header() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  return (
    <>
      <div className="header">
        <h1>Budgets</h1>
        <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
          Add budget
        </Button>
        <Button variant="outline-primary">Add Expense</Button>
      </div>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      ></AddBudgetModal>
    </>
  );
}
