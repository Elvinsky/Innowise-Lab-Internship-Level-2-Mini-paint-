import { reactive } from "vue";
import { Store, UserWithId } from "@/types/interfaces";

export const store = (): Store => {
  const userData: UserWithId = reactive({
    name: "",
    email: "",
    password: "",
    id: "",
  });
  const setUserData = (data: UserWithId) => {
    userData.name = data.name;
    userData.email = data.email;
    userData.password = data.password;
    userData.id = data.id;
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return {
    userData,
    setUserData,
  };
};
