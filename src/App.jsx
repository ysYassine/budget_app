import "./App.css";
import Container from "react-bootstrap/esm/Container";
import Header from "./components/header/Header";
import BudgetCard from "./components/budget_card/BudgetCard";
import { useBudgets } from "./contexts/BudgetsContext";
import AddBudgetModal from "./components/modals/AddBudgetModal";
import AddExpenseModal from "./components/modals/AddExpenseModal";
import { useState } from "react";

function App() {
  const { budgets, getBudgetExpenses } = useBudgets();
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [newExpenseBudgetId, setnewExpenseBudgetId] = useState();

  function openAddExpenseModal(budgetID) {
    setShowAddExpenseModal(true);
    setnewExpenseBudgetId(budgetID);
  }
  return (
    <>
      <Container>
        <Header
          addBudgetCallBack={setShowAddBudgetModal}
          addExpenseCallBack={openAddExpenseModal}
        ></Header>
        <div className="budget-container">
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                addExpenseCallBack={() => openAddExpenseModal(budget.id)}
              />
            );
          })}
        </div>
      </Container>
      <>
        <AddBudgetModal
          show={showAddBudgetModal}
          handleClose={() => setShowAddBudgetModal(false)}
        ></AddBudgetModal>
        <AddExpenseModal
          show={showAddExpenseModal}
          handleClose={() => setShowAddExpenseModal(false)}
          defaultBudgetId={newExpenseBudgetId}
        ></AddExpenseModal>
      </>
    </>
  );
}

export default App;
