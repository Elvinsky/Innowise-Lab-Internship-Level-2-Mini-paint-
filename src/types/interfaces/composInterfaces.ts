import { CanvasFlag } from "@/types/literals/literals";
import { Ref } from "vue";
import { User } from "firebase/auth";
import { LineCoords } from "./canvasInterfaces";

export interface CanvasFlagCompos {
  flag: Ref<CanvasFlag>;
  setFlag: (flag: CanvasFlag) => void;
}
export interface CanvasCompos {
  canvas: Ref<HTMLCanvasElement | null>;
  setCanvas: (canvas: HTMLCanvasElement) => void;
}
export interface CanvasContextCompos {
  ctx: Ref<CanvasRenderingContext2D | null>;
  setCtx: (canvas: CanvasRenderingContext2D) => void;
}
export interface DrawingStyleCompos {
  penWidth: Ref<number>;
  penColor: Ref<string>;
  setWidth: (param: number) => void;
  setColor: (param: string) => void;
}
export interface UserDataCompos {
  user: Ref<User | null>;
  setUser: (userData: User | null) => void;
}
export interface LineInterface {
  line: Ref<LineCoords>;
  setX1: (x1: number) => void;
  setX2: (x2: number) => void;
  setY1: (y1: number) => void;
  setY2: (y2: number) => void;
}
