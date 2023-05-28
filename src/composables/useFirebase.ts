import { auth } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useToast } from "./useToast";
import { setItem } from "@/FirebaseManipulation/firebaseCRUD";
const { showToast } = useToast();
export const useFirebase = () => {
  const firebaseRegister = async (
    email: string,
    password: string,
    name: string
  ) => {
    try {
      createUserWithEmailAndPassword(auth, email, password).then(() => {
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
            .then(() => {
              localStorage.setItem("user", JSON.stringify(auth.currentUser));
            });
        }
      });
    } catch (error) {
      showToast("error");
    }
  };
  const firebaseLogin = async (email: string, password: string) => {
    try {
      const creds = await signInWithEmailAndPassword(auth, email, password);
      return creds;
    } catch (err) {
      showToast("error");
    }
  };
  return {
    firebaseRegister,
    firebaseLogin,
  };
};
