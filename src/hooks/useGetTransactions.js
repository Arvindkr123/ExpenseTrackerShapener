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
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          docs.push({ ...data, id });
        });
        setTransactions(docs);
      });
    } catch (error) {
      console.log(error);
    }
    return () => unsubsribe();
  };

  useEffect(() => {
    getTransactions();
  }, []);
  return { transactions };
}
