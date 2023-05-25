import { auth } from "@/firebase";
import router from "@/router";
import { setItem } from "@/scripts/FirebaseManipulation/firebaseCRUD";
import { UserDataComposable } from "@/types/interfaces/composableInterfaces";
import { UserData } from "@/types/interfaces/userInterfaces";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Ref, ref } from "vue";
import { useToast } from "./useToast";
import { FormField } from "@/types/literals/literals";

const toast = useToast();
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const user: Ref<User | null> = ref(JSON.parse(localStorage.getItem("user")!));
const authError: Ref<boolean> = ref(false);
const formData: Ref<UserData> = ref({
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
});

export const useUser = (): UserDataComposable => {
  const setUser = () => {
    signInWithEmailAndPassword(
      auth,
      formData.value.email,
      formData.value.password
    )
      .then((creds) => {
        user.value = creds.user;
        localStorage.setItem("user", JSON.stringify(creds.user));
        toast.showToast("success");
        router.push("/home");
      })
      .catch(() => {
        toast.showToast("error");
        authError.value = true;
        setTimeout(() => {
          authError.value = false;
        }, 2000);
      });
  };
  const regUser = () => {
    if (formData.value.password !== formData.value.passwordConfirm) {
      formData.value.email = "";
      formData.value.name = "";
      formData.value.password = "";
      formData.value.passwordConfirm = "";
      authError.value = true;
      toast.showToast("error");
    }
    createUserWithEmailAndPassword(
      auth,
      formData.value.email,
      formData.value.password
    )
      .then(() => {
        if (auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: formData.value.name,
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
        setUser();
        toast.showToast("success");
      })
      .catch(() => {
        toast.showToast("error");
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
  const setFormData = (field: FormField, data: string) => {
    formData.value[field] = data;
  };

  return {
    user,
    setUser,
    authError,
    regUser,
    logOut,
    formData,
    setFormData,
  };
};
