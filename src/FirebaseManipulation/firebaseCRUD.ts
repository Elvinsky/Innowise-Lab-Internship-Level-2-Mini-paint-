import {
  collection,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  arrayUnion,
} from "firebase/firestore/lite";
import { db } from "@/firebase";

export async function getItems(path: string) {
  const itemsCol = collection(db, path);
  const itemSnapshot = await getDocs(itemsCol);
  const itemList = itemSnapshot.docs.map((doc) => doc.data());
  return itemList;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function setItem(item: string, data: any, id: string) {
  const docRef = doc(db, item, id);
  await setDoc(docRef, { ...data, id });
}

export async function updateItem(
  item: string,
  itemId: string,
  element: string
) {
  const itemRef = doc(db, item, itemId.toString());
  await updateDoc(itemRef, { images: arrayUnion(element) });
}
