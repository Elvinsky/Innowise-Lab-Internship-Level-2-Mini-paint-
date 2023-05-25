<template>
  <div class="login-wrap">
    <h2>Register</h2>
    <BaseForm>
      <BaseInput
        :error="user.authError.value"
        :value="user.formData.value.name"
        :onChange="handleSetName"
        type="text"
        placeholder="name"
      />
      <BaseInput
        :error="user.authError.value"
        :value="user.formData.value.email"
        :onChange="handleSetEmail"
        type="email"
        placeholder="email"
      />
      <BaseInput
        :error="user.authError.value"
        :value="user.formData.value.password"
        :onChange="handleSetPassword"
        type="password"
        placeholder="password"
      />
      <BaseInput
        :error="user.authError.value"
        :value="user.formData.value.passwordConfirm"
        :onChange="handleSetPasswordCofirm"
        type="password"
        placeholder="repeat password"
      />
      <div class="actions">
        <BaseButton class="auth" :onClick="handleRegister">Submit</BaseButton>
        <RouterLink to="/login" class="link">
          Already have an account?
        </RouterLink>
      </div>
    </BaseForm>
  </div>
  <CustomToasts :type="toast.toastShown.value"></CustomToasts>
</template>

<script setup lang="ts">
import CustomToasts from "@/components/Toast/CustomToast.vue";
import BaseButton from "../BaseComponents/BaseButton.vue";
import { useUser } from "@/composables/useUser";
import BaseForm from "../BaseComponents/BaseForm.vue";
import { useToast } from "@/composables/useToast";
import BaseInput from "../BaseComponents/BaseInput.vue";
const user = useUser();
const toast = useToast();
const handleSetEmail = (value: string) => {
  user.formData.value.email = value;
};
const handleSetName = (value: string) => {
  user.formData.value.name = value;
};
const handleSetPassword = (value: string) => {
  user.formData.value.password = value;
};
const handleSetPasswordCofirm = (value: string) => {
  user.formData.value.passwordConfirm = value;
};
const handleRegister = () => {
  user.regUser();
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
