<template>
  <div class="login-wrap">
    <h2>Login</h2>
    <BaseForm :formData="formFields" :onUserInput="handleInput" />
    <div class="actions">
      <BaseButton class="auth" :onClick="handleLogin">Submit</BaseButton>
      <RouterLink to="/registration" class="link">
        Not yet have an account?
      </RouterLink>
    </div>
  </div>
  <CustomToasts :type="toast.toastShown.value"></CustomToasts>
</template>

<script setup lang="ts">
import CustomToasts from "@/components/Toast/CustomToast.vue";
import BaseButton from "../BaseComponents/BaseButton.vue";
import { useUser } from "@/composables/useUser";
import BaseForm from "../BaseComponents/BaseForm.vue";
import { useToast } from "@/composables/useToast";
import { UserData } from "@/types/interfaces/userInterfaces";
import { Ref, ref } from "vue";
import { FormField } from "@/types/literals/literals";
const user = useUser();
const toast = useToast();
const userFormData: Ref<UserData> = ref({
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
});
const formFields = [
  {
    type: "text",
    placeholder: "e-mail",
    model: "email",
  },
  {
    type: "password",
    placeholder: "password",
    model: "password",
  },
];
const handleLogin = () => {
  user.setUser(userFormData.value);
};
const handleInput = (value: string, model: FormField) => {
  userFormData.value[model] = value;
};
</script>

<style scoped lang="scss">
@mixin for-phone {
  @media (max-width: 599px) {
    @content;
  }
}
.login-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
  margin-top: 5em;

  .actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;
    @include for-phone {
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .link {
      font-size: 0.7em;
      @include for-phone {
        font-size: 1em;
      }
    }
  }
}
</style>
