import { CanvasFlag } from "@/types/literals/literals";
import { Ref } from "vue";
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
