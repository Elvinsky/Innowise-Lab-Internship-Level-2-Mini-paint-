import { useCanvas } from "@/composables/useCanvas";
import { CanvasSizes } from "@/types/interfaces/canvasInterfaces";
import { CanvasCompos } from "@/types/interfaces/composInterfaces";
import { Ref, ref, nextTick } from "vue";
import { useRoute } from "vue-router";
export const initCanvas = () => {
  const route = useRoute();
  const canvas: CanvasCompos = useCanvas();
  const sizes: Ref<CanvasSizes> = ref({
    width: 1000,
    height: 500,
  });
  const isMobile = window.innerWidth < 768;
  sizes.value = {
    width: isMobile ? 300 : 1000,
    height: isMobile ? 500 : 500,
  };

  (async () => {
    await nextTick(); // Wait for the next tick to ensure the canvas element is mounted
    canvas.setCanvas(document.getElementById("canvas") as HTMLCanvasElement);
    if (canvas.canvas.value) {
      canvas.setCtx(
        canvas.canvas.value.getContext("2d") as CanvasRenderingContext2D
      );
    }
    if (canvas.canvas.value) {
      canvas.canvas.value.width = sizes.value.width;
      canvas.canvas.value.height = sizes.value.height;
      if (route.params.context && canvas.ctx.value) {
        const image = new Image();
        image.src = route.params.context as string;
        image.onload = () => {
          if (canvas.ctx.value) canvas.ctx.value.drawImage(image, 0, 0);
        };
      }
    }
  })();
};
