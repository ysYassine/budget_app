import "./App.css";
import Container from "react-bootstrap/esm/Container";
import Header from "./components/header/Header";
import BudgetCard from "./components/budget_card/BudgetCard";
import { useBudgets } from "./contexts/BudgetsContext";

function App() {
  const { budgets, getBudgetExpenses } = useBudgets();
  return (
    <Container>
      <Header></Header>
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
            />
          );
        })}
      </div>
    </Container>
  );
}

export default App;
