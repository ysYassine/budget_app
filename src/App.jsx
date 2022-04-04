import "./App.css";
import Container from "react-bootstrap/esm/Container";
import Header from "./components/header/Header";
import BudgetCard from "./components/budget_card/BudgetCard";

function App() {
  return (
    <Container>
      <Header></Header>
      <div className="budget-container">
        <BudgetCard name="Entertainment" amount={500} max={1000}></BudgetCard>
        <BudgetCard name="Food" amount={500} max={500}></BudgetCard>
        <BudgetCard name="Uncategorized" amount={200} max={300}></BudgetCard>
      </div>
    </Container>
  );
}

export default App;
