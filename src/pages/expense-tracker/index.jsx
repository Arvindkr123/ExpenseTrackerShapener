import React, { useState } from "react";
import { useAddTransactions } from "../../hooks/useAddTransactions";
import useGetTransactions from "../../hooks/useGetTransactions";
import "./styels.css";
import useGetUserInfo from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ExpenseTracker = () => {
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const { addTransaction } = useAddTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const { transactions, transactionsTotal } = useGetTransactions();
  // console.log(transactions);
  const SubmitHandler = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    setDescription("");
    toast.success("Added transaction successfully");
    setTransactionAmount(0);
  };

  const SignOutHandler = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("auth");
      toast.success("logged out successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="expense_tracker">
        <div className="container">
          <h1 className="heading">{name}'s Expense Tracker</h1>
          <div className="balance">
            <h3>Your Balance</h3>
            {transactionsTotal.balance > 0 ? (
              <h2> Rs {transactionsTotal.balance}</h2>
            ) : (
              <h2> -Rs {transactionsTotal.balance * -1}</h2>
            )}
          </div>
          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p>Rs {transactionsTotal.income}</p>
            </div>
            <div className="expenses">
              <h4>Expenses</h4>
              <p>Rs {transactionsTotal.expense}</p>
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
            <button className="form-btn" type="submit">
              Add Transaction
            </button>
          </form>
        </div>

        {profilePhoto && (
          <div className="profile">
            <img src={profilePhoto} className="profile_photo" />
            <button className="signOut" onClick={SignOutHandler}>
              SignOut
            </button>
          </div>
        )}
      </div>
      <div className="transactions">
        <p className="p">Transactions</p>
        <ul className="list">
          {transactions.map((ele, i) => {
            const { description, transactionAmount, transactionType } = ele;
            //console.log(ele);
            return (
              <li key={i}>
                <h3>{description}</h3>
                <p>
                  {transactionAmount}Rs .{" "}
                  <label style={transactionType==="income"?{color:"green"}:{color:"red"}} htmlFor="">{transactionType}</label>
                </p>
                <button className="dbtn">Delete</button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ExpenseTracker;
