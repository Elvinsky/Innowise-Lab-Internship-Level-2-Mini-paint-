<template>
  <RegistrationForm />
</template>

<script setup lang="ts">
import RegistrationForm from "@/components/AuthComponents/RegistrationForm.vue";
</script>

<style scoped lang="scss">
$padding: 0.4em 0.6em;
$border-radius: 5px;
$input-width: 200px;

@mixin form-style {
  display: inherit;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(209, 209, 209, 0.641);
  border-radius: 5px;
  padding: 1em;
  gap: 0.6em;
}
@mixin for-phone {
  @media (max-width: 599px) {
    @content;
  }
}

.register-wrap {
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
