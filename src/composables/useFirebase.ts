import { auth, storage } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useToast } from "./useToast";
import { setItem, updateItem } from "@/FirebaseManipulation/firebaseCRUD";
import {
  ListResult,
  StorageReference,
  UploadMetadata,
  listAll,
  ref,
  uploadBytes,
} from "@firebase/storage";
import { useUser } from "./useUser";
import { useCanvas } from "./useCanvas";
const { showToast } = useToast();
const { canvas } = useCanvas();
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
  const firebaseBytesUpload = (file: File, filename: string) => {
    const { user } = useUser();
    if (!user.value || !canvas.value) return;
    const metadata: UploadMetadata = {
      customMetadata: {
        uploadedBy: user.value.email as string,
        uploadedAt: Math.round(
          new Date().getTime() / 1000
        ).toString() as string,
        canvasCtx: canvas.value.toDataURL(),
      },
    };
    if (!metadata.customMetadata) return;
    const imageRef: StorageReference = ref(storage, filename + ".png");
    updateItem("users", user.value.uid, metadata.customMetadata.uploadedAt);
    uploadBytes(imageRef, file, metadata);
  };
  const firebaseGetAllItems = async (refUrl: string) => {
    const storageRef = ref(storage, refUrl);
    const res: ListResult = await listAll(storageRef);
    return res;
  };
  return {
    firebaseRegister,
    firebaseLogin,
    firebaseBytesUpload,
    firebaseGetAllItems,
  };
};
