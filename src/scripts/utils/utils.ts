import { DocumentData } from "firebase/firestore/lite";
import { whereQuery } from "../dbScripts/queries";
import { UserData } from "@/types/interfaces";

export const isValidCreds = (data: UserData): boolean => {
  if (data.name.length > 0 && data.name.length <= 80) {
    if (
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data.email) &&
      data.email.length <= 80
    ) {
      if (data.password.length >= 5 && data.password.length <= 30) {
        if (data.password === data.repPassword) {
          return true;
        }
      }
    }
  }
  // return true
  return false;
};
export const isUniqueUser = async (data: string) => {
  const user: DocumentData[] = await whereQuery("users", "username", data);
  return user.length === 0;
};
