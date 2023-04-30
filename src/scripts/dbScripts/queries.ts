import {
  collection,
  query,
  where,
  getDocs,
  and,
  or,
} from "firebase/firestore/lite";
import { db } from "@/firebase";
export const whereQuery = async (
  docinf: string,
  field: string,
  value: string
) => {
  const q = query(collection(db, docinf), where(field, "==", value));
  const querySnapshot = await getDocs(q);
  const results = querySnapshot.docs.map((docinf) => docinf.data());
  return results;
};
export const loginQuery = async (email: string, pass: string) => {
  const q = query(
    collection(db, "users"),
    and(
      or(where("email", "==", email), where("username", "==", email)),

      where("password", "==", pass)
    )
  );
  const querySnapshot = await getDocs(q);
  const results = querySnapshot.docs.map((doc) => doc.data());
  return results;
};
export const getTodosByDay = async (date: Date, path: string) => {
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const startSec = startOfDay.getTime();
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));
  const endSec = endOfDay.getTime();
  const q = query(
    collection(db, path),
    and(where("date", ">=", startSec), where("date", "<=", endSec))
  );

  const querySnapshot = await getDocs(q);
  const results = querySnapshot.docs.map((doc) => doc.data());
  return results;
};
