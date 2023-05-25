import { Ref, ref } from "vue";

const toastShown: Ref<string> = ref("");
export const useToast = () => {
  const showToast = (toast: string) => {
    toastShown.value = toast;
    setTimeout(() => {
      toastShown.value = "";
    }, 5000);
  };
  return {
    toastShown,
    showToast,
  };
};
