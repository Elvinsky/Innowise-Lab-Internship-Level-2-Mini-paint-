import { CanvasFlag } from "@/types/literals/literals";
import { Ref } from "vue";
import { User } from "firebase/auth";
import { Photo } from "./photoInterface";
import { UserData } from "./userInterfaces";

export interface CanvasCompos {
  readonly canvas: Ref<HTMLCanvasElement | null>;
  setCanvas: (data: HTMLCanvasElement) => void;
  readonly ctx: Ref<CanvasRenderingContext2D | null>;
  setCtx: (data: CanvasRenderingContext2D) => void;
  readonly flag: Ref<string | null>;
  setFlag: (data: CanvasFlag) => void;
  readonly penWidth: Ref<number>;
  setPenWidth: (data: number) => void;
  readonly penColor: Ref<string>;
  setPenColor: (data: string) => void;
}
export interface UserDataCompos {
  readonly user: Ref<User | null>;
  setUser: (input: Ref<UserData>) => void;
  readonly authError: Ref<boolean>;
  regUser: (input: Ref<UserData>) => void;
  logOut: () => void;
  readonly userInput: Ref<UserData>;
  setUserInput: (
    email: string,
    password: string,
    name: string,
    passwordConfirm: string
  ) => void;
}
export interface PaginationInterface {
  readonly photos: Ref<Photo[] | null>;
  setCanvases: (photo: Photo[]) => void;
}
