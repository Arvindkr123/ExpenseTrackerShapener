import React, { useState } from "react";
import { useAddTransactions } from "../../hooks/useAddTransactions";
import useGetTransactions from "../../hooks/useGetTransactions";

const ExpenseTracker = () => {
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const { addTransaction } = useAddTransactions();
  const { transactions } = useGetTransactions();
  console.log(transactions);
  const SubmitHandler = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
  };
  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1>Expense Tracker</h1>
          <div className="balance">
            <h3>Your Balance</h3>
            <h2>Rs 0.0</h2>
          </div>
          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p>Rs 0.0</p>
            </div>
            <div className="expenses">
              <h4>Expenses</h4>
              <p>Rs 0.0</p>
            </div>
          </div>
          <form onSubmit={SubmitHandler} className="add-transaction">
            <input
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              required
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            <input
              type="radio"
              id="expense"
              value="expense"
              onChange={(e) => setTransactionType(e.target.value)}
              checked={transactionType === "expense"}
            />
            <label htmlFor="expense">Expense</label>
            <input
              type="radio"
              id="income"
              value="income"
              onChange={(e) => setTransactionType(e.target.value)}
              checked={transactionType === "income"}
            />
            <label htmlFor="income">Income</label>
            <button type="submit">Add Transaction</button>
          </form>
        </div>
      </div>
      <div>Transactions</div>
      <ul>
        {transactions.map((ele) => {
          const { description, transactionAmount, transactionType } = ele;
          console.log(ele);
          return (
            <li>
              <h3>{description}</h3>
              <p>
                $ {transactionAmount} .{" "}
                <label htmlFor="">{transactionType}</label>
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ExpenseTracker;
