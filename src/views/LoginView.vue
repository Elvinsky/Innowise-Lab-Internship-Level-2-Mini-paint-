<template>
  <div class="login-wrap">
    <h2>Login</h2>
    <CustomForm>
      <CustomInput :inputFlag="'email'" :type="'text'" :id="'email'" />
      <CustomInput
        :inputFlag="'password'"
        :type="'password'"
        :id="'password'"
      />
      <div class="actions">
        <CustomButton :action="('setUser'as ActionFlag)" :class="'auth'"
          >Login</CustomButton
        >
        <RouterLink to="/registration" class="link">
          Noe yet have an account?
        </RouterLink>
      </div>
    </CustomForm>
  </div>
</template>

<script setup lang="ts">
import CustomInput from "@/components/UI/FormComponents/CustomInput.vue";
import CustomButton from "@/components/UI/FormComponents/CustomButton.vue";
import CustomForm from "@/components/UI/FormComponents/CustomForm.vue";
import { ActionFlag } from "@/types/literals/literals";
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
