import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore/lite";

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
