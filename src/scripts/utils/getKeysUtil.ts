import { getItems } from "../dbScripts/crudApi";

export const getKeys = async (filter: string) => {
  try {
    const data = await getItems("users");
    const keys: string[] = [];
    data
      .filter((el) => el.email.includes(filter))
      .forEach((user) => keys.push(...user.images));
    return keys;
  } catch (err) {
    console.error("err", err);
  }
};
