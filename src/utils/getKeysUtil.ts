import { useToast } from "@/composables/useToast";
import { getItems } from "../FirebaseManipulation/firebaseCRUD";
const { showToast } = useToast();
export const getKeys = async (filter: string) => {
  try {
    const data = await getItems("users");
    const keys: string[] = [];
    data
      .filter((el) => el.email.includes(filter))
      .forEach((user) => keys.push(...user.images));
    return keys;
  } catch (err) {
    showToast("error");
  }
};
