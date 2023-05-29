<template>
  <div class="login-wrap">
    <h2 v-if="props.authFlag === 'register'">Register</h2>
    <h2 v-else>Login</h2>
    <BaseForm
      :formData="
        props.authFlag === 'login'
          ? formFields.filter(
              (el) =>
                el.placeholder === 'e-mail' || el.placeholder === 'password'
            )
          : formFields
      "
      :error="authError"
      :disabled="disabled"
    />

    <div class="actions">
      <BaseButton class="auth" :onClick="handleAuth">Submit</BaseButton>
      <RouterLink
        :to="props.authFlag === 'register' ? '/login' : '/registration'"
        class="link"
      >
        <span v-if="props.authFlag === 'register'">
          Already have an account?
        </span>
        <span v-else> Not yet have an account? </span>
      </RouterLink>
    </div>
  </div>
  <CustomToasts :type="toastShown"></CustomToasts>
</template>

<script setup lang="ts">
import CustomToasts from "@/components/Toast/CustomToast.vue";
import BaseButton from "../BaseComponents/BaseButton.vue";
import { useUser } from "@/composables/useUser";
import BaseForm from "../BaseComponents/BaseForm.vue";
import { useToast } from "@/composables/useToast";
import { UserData } from "@/types/interfaces/userInterfaces";
import { Ref, ref, defineProps } from "vue";
const { setUser, regUser, authError } = useUser();
const { toastShown, showToast } = useToast();
const props = defineProps(["authFlag"]);
const userFormData: Ref<UserData> = ref({
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
});
const disabled: Ref<boolean> = ref(false);
const formFields = [
  {
    type: "text",
    placeholder: "name",
    model: (data: string) => {
      userFormData.value.name = data;
    },
  },
  {
    type: "text",
    placeholder: "e-mail",
    model: (data: string) => {
      userFormData.value.email = data;
    },
  },
  {
    type: "password",
    placeholder: "password",
    model: (data: string) => {
      userFormData.value.password = data;
    },
  },
  {
    type: "password",
    placeholder: "repeat password",
    model: (data: string) => {
      userFormData.value.passwordConfirm = data;
    },
  },
];

const handleAuth = () => {
  disabled.value = true;
  setTimeout(() => (disabled.value = false), 700);
  if (props.authFlag === "register") {
    if (userFormData.value.password !== userFormData.value.passwordConfirm) {
      showToast("error");
      userFormData.value = {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
      };
      return;
    } else {
      regUser(userFormData.value);
    }
  } else {
    setUser(userFormData.value);
  }
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
