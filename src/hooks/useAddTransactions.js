import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import useGetUserInfo from "./useGetUserInfo";
import { db } from "../config/firebaseConfig";

export function useAddTransactions() {
  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();
  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType,
  }) => {
    await addDoc(transactionCollectionRef, {
      userID,
      description,
      transactionAmount,
      transactionType,
      createdAt: serverTimestamp(),
    });
  };
  return { addTransaction };
}
