import router from "@/router";
import { UserDataComposable } from "@/types/interfaces/composableInterfaces";
import { UserData } from "@/types/interfaces/userInterfaces";
import { User } from "firebase/auth";
import { Ref, ref } from "vue";
import { useToast } from "./useToast";
import { useFirebase } from "./useFirebase";
const { firebaseRegister, firebaseLogin } = useFirebase();
const toast = useToast();
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const user: Ref<User | null> = ref(JSON.parse(localStorage.getItem("user")!));
const authError: Ref<boolean> = ref(false);

export const useUser = (): UserDataComposable => {
  const setUser = (data: UserData) => {
    firebaseLogin(data.email, data.password)
      .then((creds) => {
        if (!creds) return;
        user.value = creds.user;
        localStorage.setItem("user", JSON.stringify(creds.user));
        toast.showToast("success");
        router.push("/home");
      })
      .catch(() => {
        authError.value = true;
        setTimeout(() => {
          authError.value = false;
        }, 2000);
      });
  };
  const regUser = (data: UserData) => {
    firebaseRegister(data.email, data.password, data.name as string)
      .then(() => {
        toast.showToast("success");
        router.push("/home");
      })
      .catch(() => {
        authError.value = true;
        setTimeout(() => {
          authError.value = false;
        }, 2000);
      });
  };

  const logOut = () => {
    user.value = null;
    localStorage.removeItem("user");
    router.push("/login");
  };

  return {
    user,
    setUser,
    authError,
    regUser,
    logOut,
  };
};
