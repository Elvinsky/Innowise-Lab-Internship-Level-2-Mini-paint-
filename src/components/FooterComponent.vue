<template>
  <footer>
    <h2>Made by Nick Mikhnevich. Mini-Paint Innowise task #9</h2>
    <h2 class="mobile">Innowise Task #9</h2>
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
  background-color: aliceblue;
  font-size: 1em;
  h2 {
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
