import "./App.css";
import Container from "react-bootstrap/esm/Container";
import Header from "./components/header/Header";
import BudgetCard from "./components/budget_card/BudgetCard";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import AddBudgetModal from "./components/modals/AddBudgetModal";
import AddExpenseModal from "./components/modals/AddExpenseModal";
import { useState } from "react";
import UncategorizedBudgetCard from "./components/budget_card/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/budget_card/TotalBudgetCard";
import ViewExpensesModal from "./components/modals/ViewExpensesModal";

function App() {
  const { budgets, getBudgetExpenses } = useBudgets();
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [newExpenseBudgetId, setnewExpenseBudgetId] = useState();
  const [viewExpenses, setViewExpenses] = useState();

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
                viewExpensesCallBack={() => setViewExpenses(budget.id)}
              />
            );
          })}
          <UncategorizedBudgetCard
            addExpenseCallBack={openAddExpenseModal}
            viewExpensesCallBack={() =>
              setViewExpenses(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
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
        <ViewExpensesModal
          budgetId={viewExpenses}
          handleClose={() => setViewExpenses()}
        ></ViewExpensesModal>
      </>
    </>
  );
}

export default App;
