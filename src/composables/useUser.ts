import { auth } from "@/firebase";
import router from "@/router";
import { setItem } from "@/scripts/dbScripts/crudApi";
import { UserDataCompos } from "@/types/interfaces/UserDataCompos";
import { UserData } from "@/types/interfaces/userInterfaces";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Ref, ref } from "vue";
import { useToast } from "./useToast";

const toast = useToast();
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const user: Ref<User | null> = ref(JSON.parse(localStorage.getItem("user")!));
const authError: Ref<boolean> = ref(false);
const userInput: Ref<UserData> = ref({
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
});

export const useUser = (): UserDataCompos => {
  const setUser = (input: Ref<UserData>) => {
    signInWithEmailAndPassword(auth, input.value.email, input.value.password)
      .then((creds) => {
        user.value = creds.user;
        localStorage.setItem("user", JSON.stringify(creds.user));
        toast.showToast("success");
        router.push("/home");
      })
      .catch((err) => {
        console.error("error", err);
        toast.showToast("error");
        authError.value = true;
      });
  };
  const regUser = (input: Ref<UserData>) => {
    if (input.value.password !== input.value.passwordConfirm) {
      userInput.value.email = "";
      userInput.value.name = "";
      userInput.value.password = "";
      userInput.value.passwordConfirm = "";
      authError.value = true;
      toast.showToast("error");
    }
    createUserWithEmailAndPassword(
      auth,
      input.value.email,
      input.value.password
    )
      .then(() => {
        if (auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: input.value.name,
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
        setUser(input);
        toast.showToast("success");
      })
      .catch(() => {
        authError.value = true;
        toast.showToast("error");
      });
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
    authError,
    regUser,
    logOut,
    userInput,
    setUserInput,
  };
};
