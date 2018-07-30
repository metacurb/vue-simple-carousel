<template>
  <div draggable="false" class="vs-carousel--slide">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Slide',
  mounted() {
    this.$el.addEventListener('dragstart', e => e.preventDefault());
  },
};
</script>

<style lang="scss">
.vs-carousel--slide {
  width: 100%;

  img {
    display: block;
    width: 100%;
  }
}
</style>
