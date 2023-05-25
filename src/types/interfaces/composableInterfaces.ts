import { CanvasFlag, FormField } from "@/types/literals/literals";
import { Ref } from "vue";
import { User } from "firebase/auth";
import { Photo } from "./photoInterface";
import { UserData } from "./userInterfaces";

export interface CanvasComposable {
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
export interface ImagesComposableInterface {
  readonly photos: Ref<Photo[] | null>;
  setCanvases: (photos: Photo[]) => void;
  readonly limit: Ref<number>;
  setLimit: (value: number) => void;
  readonly page: Ref<number>;
  setPage: (value: number) => void;
  readonly totalPages: Ref<number>;
  setTotalPages: (value: number) => void;
  readonly currentImageData: Ref<string | null>;
  setCurrentImageData: (value: string | null) => void;
}
export interface UserDataComposable {
  readonly user: Ref<User | null>;
  setUser: () => void;
  readonly authError: Ref<boolean>;
  regUser: () => void;
  logOut: () => void;
  readonly formData: Ref<UserData>;
  setFormData: (field: FormField, data: string) => void;
}
export interface PaginationInterface {
  readonly photos: Ref<Photo[] | null>;
  setCanvases: (photo: Photo[]) => void;
}
export interface ToastInterface {
  readonly toastShown: Ref<string>;
  showToast: (data: string) => void;
}
