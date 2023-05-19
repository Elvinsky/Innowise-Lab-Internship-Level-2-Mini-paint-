import { auth } from "@/firebase";
import router from "@/router";
import { setItem } from "@/scripts/dbScripts/crudApi";
import { UserDataCompos } from "@/types/interfaces/composInterfaces";
import { UserData } from "@/types/interfaces/userInterfaces";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Ref, ref } from "vue";
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const user: Ref<User | null> = ref(JSON.parse(localStorage.getItem("user")!));
const toastShown: Ref<string> = ref("");
const authError: Ref<boolean> = ref(false);
const userInput: Ref<UserData> = ref({
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
});

export const useUser = (): UserDataCompos => {
  const setUser = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((creds) => {
        user.value = creds.user;
        localStorage.setItem("user", JSON.stringify(creds.user));
        showToast("success");
        router.push("/home");
      })
      .catch((err) => {
        console.error("error", err);
        showToast("error");
        authError.value = true;
      });
  };

  const regUser = (email: string, password: string, name: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: name,
          }).then(() => {
            if (!auth.currentUser) return;
            setItem(
              "users",
              {
                name: auth.currentUser.displayName,
                email: auth.currentUser.email,
                images: [],
              },
              auth.currentUser.uid
            );
          });
        }
        setUser(email, password);
        showToast("success");
      })
      .catch(() => {
        authError.value = true;
        showToast("error");
      });
  };
  const showToast = (toast: string) => {
    toastShown.value = toast;
    setTimeout(() => {
      toastShown.value = "";
    }, 5000);
  };
  const logOut = () => {
    user.value = null;
    localStorage.removeItem("user");
    router.push("/login");
  };
  const setUserInput = (
    email: string,
    password: string,
    name = "",
    passwordConfirm = ""
  ) => {
    userInput.value = {
      email: email,
      password: password,
      name: name,
      passwordConfirm: passwordConfirm,
    };
  };

  return {
    user,
    setUser,
    toastShown,
    showToast,
    authError,
    regUser,
    logOut,
    userInput,
    setUserInput,
  };
};
