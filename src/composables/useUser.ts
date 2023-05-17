import { auth } from "@/firebase";
import router from "@/router";
import { setItem } from "@/scripts/dbScripts/crudApi";
import { UserDataCompos } from "@/types/interfaces/composInterfaces";
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

export const useUser = (): UserDataCompos => {
  const setUser = async (email: string, password: string) => {
    try {
      signInWithEmailAndPassword(auth, email, password).then((creds) => {
        localStorage.setItem("user", JSON.stringify(creds.user));
        showToast("success");
        router.push("/home");
      });
    } catch (err) {
      console.error("error", err);
      showToast("error");
      authError.value = true;
    }
  };
  const regUser = (email: string, password: string, name: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: name,
          })
            .then(() => {
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
            })
            .then(() => setUser(email, password));
        }
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
  return { user, setUser, toastShown, showToast, authError, regUser, logOut };
};
