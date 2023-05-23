import { useCanvas } from "@/composables/useCanvas";
import { CanvasCompos } from "@/types/interfaces/composInterfaces";
import { nextTick } from "vue";
import { useRoute } from "vue-router";
export const initCanvas = async () => {
  const route = useRoute();
  const canvas: CanvasCompos = useCanvas();
  (async () => {
    await nextTick(); // Wait for the next tick to ensure the canvas element is mounted
    canvas.setCanvas(document.getElementById("canvas") as HTMLCanvasElement);
    if (canvas.canvas.value) {
      canvas.setCtx(
        canvas.canvas.value.getContext("2d") as CanvasRenderingContext2D
      );
    }
    if (canvas.canvas.value) {
      canvas.canvas.value.width = window.innerWidth * 0.7;
      canvas.canvas.value.height = 500;
      console.log(window.innerWidth);
      canvas.canvas.value.style.width = window.innerWidth * 0.7 + "px";
      canvas.canvas.value.style.height = 500 + "px";

      if (route.params.context && canvas.ctx.value) {
        const image = new Image();
        image.src = route.params.context as string;
        image.onload = () => {
          if (!canvas.canvas.value) return;
          const scaleX = canvas.canvas.value.width / image.width;
          const scaleY = canvas.canvas.value.height / image.height;
          const scale = Math.min(scaleX, scaleY);

          const scaledWidth = image.width * scale;
          const scaledHeight = image.height * scale;

          const x = (canvas.canvas.value.width - scaledWidth) / 2;
          const y = (canvas.canvas.value.height - scaledHeight) / 2;

          if (canvas.ctx.value) {
            canvas.ctx.value.clearRect(
              0,
              0,
              canvas.canvas.value.width,
              canvas.canvas.value.height
            );
            canvas.ctx.value.drawImage(image, x, y, scaledWidth, scaledHeight);
          }
        };
      }
    }
  })();
};
