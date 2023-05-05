import { UserDataCompos } from "@/types/interfaces/composInterfaces";
import { User } from "firebase/auth";
import { Ref, ref } from "vue";
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const user: Ref<User | null> = ref(JSON.parse(localStorage.getItem("user")!));

export const useUser = (): UserDataCompos => {
  const setUser = (userData: User | null) => {
    localStorage.setItem("user", JSON.stringify(userData));
    user.value = userData;
  };
  return { user, setUser };
};
