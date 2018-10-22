<template>
  <div draggable="false" class="vs-carousel__slide">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Slide',
};
</script>

<style lang="scss">
.vs-carousel__slide {
  width: 100%;

  img {
    display: block;
    width: 100%;
  }
}
</style>
