import { CanvasFlag } from "./literals";
import { Ref } from "vue";

export interface UserData {
  name: string;
  email: string;
  password: string;
  repPassword: string;
}
export interface UserDataToSet {
  name: string;
  email: string;
  password: string;
}
export interface UserInput {
  email: string;
  password: string;
}
export interface UserWithId {
  name?: string;
  email?: string;
  password?: string;
  id?: string;
}
export interface CanvasSizes {
  width: number;
  height: number;
}
export interface DrawStyle {
  width: number;
  color: string;
}
export interface LineCoords {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
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
