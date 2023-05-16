import { useCanvasContext } from "@/composables/useCanvasContext";
import { useCanvas } from "@/composables/useCanvas";
import { CanvasSizes } from "@/types/interfaces/canvasInterfaces";
import {
  CanvasCompos,
  CanvasContextCompos,
} from "@/types/interfaces/composInterfaces";
import { Ref, ref, nextTick } from "vue";
export const initCanvas = () => {
  const canvas: CanvasCompos = useCanvas();
  const ctx: CanvasContextCompos = useCanvasContext();
  const sizes: Ref<CanvasSizes> = ref({
    width: 1000,
    height: 500,
  });
  // const isMobile = window.innerWidth < 768;
  // sizes.value = {
  //   width: isMobile ? 300 : 1000,
  //   height: isMobile ? 500 : 500,
  // };

  (async () => {
    await nextTick(); // Wait for the next tick to ensure the canvas element is mounted
    canvas.setCanvas(document.getElementById("canvas") as HTMLCanvasElement);
    if (canvas.canvas.value) {
      ctx.setCtx(
        canvas.canvas.value.getContext("2d") as CanvasRenderingContext2D
      );
    }
    if (canvas.canvas.value) {
      canvas.canvas.value.width = sizes.value.width;
      canvas.canvas.value.height = sizes.value.height;
      const img = document.querySelector("#preload") as HTMLImageElement | null;
      if (img) {
        ctx.ctx.value?.drawImage(img, 0, 0);
      }
    }
  })();
};
