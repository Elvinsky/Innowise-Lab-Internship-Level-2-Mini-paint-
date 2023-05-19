import { CanvasFlag } from "@/types/literals/literals";
import { Ref } from "vue";
import { User } from "firebase/auth";
import { Photo } from "./photoInterface";
import { UserData } from "./userInterfaces";

export interface CanvasCompos {
  canvas: Ref<HTMLCanvasElement | null>;
  setCanvas: (data: HTMLCanvasElement) => void;
  ctx: Ref<CanvasRenderingContext2D | null>;
  setCtx: (data: CanvasRenderingContext2D) => void;
  flag: Ref<string | null>;
  setFlag: (data: CanvasFlag) => void;
  penWidth: Ref<number>;
  setPenWidth: (data: number) => void;
  penColor: Ref<string>;
  setPenColor: (data: string) => void;
}
export interface UserDataCompos {
  user: Ref<User | null>;
  setUser: (email: string, password: string) => void;
  toastShown: Ref<string>;
  showToast: (data: string) => void;
  authError: Ref<boolean>;
  regUser: (email: string, password: string, name: string) => void;
  logOut: () => void;
  userInput: Ref<UserData>;
  setUserInput: (
    email: string,
    password: string,
    name: string,
    passwordConfirm: string
  ) => void;
}
export interface PaginationInterface {
  photos: Ref<Photo[] | null>;
  // pageTokenRef: Ref<string>;
  // setToken: (token: string) => void;
  setCanvases: (photo: Photo[]) => void;
}
