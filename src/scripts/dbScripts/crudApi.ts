// // eslint-disable-next-line max-len
// import {
//   collection,
//   getDocs,
//   addDoc,
//   deleteDoc,
//   doc,
//   updateDoc,
// } from "firebase/firestore/lite";
// import { db } from "@/firebase";
// export async function getItems(doc: string) {
//   const itemsCol = collection(db, doc);
//   const itemSnapshot = await getDocs(itemsCol);
//   const itemList = itemSnapshot.docs.map((doc) => doc.data());
//   return itemList;
// }
// export async function setItem(item: string, data: object) {
//   const ref = collection(db, item);
//   const docRef = await addDoc(ref, data);
//   const uid = docRef.id;
//   await updateDoc(doc(db, item, uid), { ...data, id: uid });
// }

// export async function updateItem(
//   item: string,
//   itemId: string,
//   newData: object
// ) {
//   const itemRef = doc(db, item, itemId.toString());
//   await updateDoc(itemRef, newData);
// }

// export async function deleteItem(collName: string, itemId: string) {
//   const itemRef = doc(db, collName, itemId);
//   await deleteDoc(itemRef);
//   console.log("Document deleted with id ", itemId);
// }
