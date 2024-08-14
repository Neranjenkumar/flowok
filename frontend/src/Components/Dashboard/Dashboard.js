import React from 'react';
import styled from 'styled-components';

function Dashboard() {
  return (
    <DashboardStyled>
      <div className="total-income">Total Income: $1522</div>
      <div className="total-expense">Total Expense: $810</div>
      <div className="total-balance">Total Balance: $712</div>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); // Adjusted minmax for better responsiveness
  gap: 20px;
  padding: 20px;

  .total-income, .total-expense, .total-balance {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // Stack items vertically on smaller screens
    .total-income, .total-expense, .total-balance {
      padding: 15px;
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    .total-income, .total-expense, .total-balance {
      padding: 10px;
      font-size: 12px;
    }
  }
`;

export default Dashboard;
