import "./Header.css";

import { Button } from "react-bootstrap";

const Header = () => {
  return (
    <div className="header">
      <h1>Budgets</h1>
      <Button variant="primary">Add budget</Button>
      <Button variant="outline-primary">Add Expense</Button>
    </div>
  );
};

export default Header;
