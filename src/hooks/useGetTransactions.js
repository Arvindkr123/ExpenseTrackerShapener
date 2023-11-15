import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import useGetUserInfo from "./useGetUserInfo";

export default function useGetTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [transactionsTotal, setTransactionsTotal] = useState({
    balance: 0.0,
    income: 0.0,
    expense: 0.0,
  });
  const collectionsRef = collection(db, "transactions");

  const { userID } = useGetUserInfo();
  const getTransactions = async () => {
    let unsubsribe;
    try {
      const queryTransactions = query(
        collectionsRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );
      unsubsribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpenses = 0;
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          docs.push({ ...data, id });
          if (data.transactionType === "income") {
            totalIncome += Number(data.transactionAmount);
          } else {
            totalExpenses += Number(data.transactionAmount);
          }
        });
        let balance = totalIncome - totalExpenses;
        setTransactions(docs);
        setTransactionsTotal({
          balance,
          income: totalIncome,
          expense: totalExpenses,
        });
      });
    } catch (error) {
      console.log(error);
    }
    return () => unsubsribe();
  };

  useEffect(() => {
    getTransactions();
  }, []);
  return { transactions, transactionsTotal };
}
