<template>
  <footer>
    <p>Made by Nick Mikhnevich. Mini-Paint Innowise task #9</p>
    <p class="mobile">Innowise Task #9</p>
  </footer>
</template>

<style scoped lang="scss">
@mixin for-phone {
  @media (max-width: 599px) {
    @content;
  }
}
footer {
  position: fixed;
  bottom: 0px;
  z-index: 999;
  width: 100%;
  padding: 1em;
  background-color: rgb(164, 213, 255);
  font-size: 1em;
  p {
    font-size: 1.4em;
    &:first-child {
      @include for-phone {
        display: none;
      }
    }
  }
  .mobile {
    display: none;
    @include for-phone {
      display: block;
    }
  }
}
</style>
