<template>
  <ul class="vs-carousel__pagination">
    <li
      v-for="(slide, index) in slides"
      :key="slide"
      class="vs-carousel__pagination-item"
      :class="{
        active: isActiveSlide(index),
      }"
      :style="{
        margin: `0 ${margin}px`,
      }"
    >
      <button
        class="vs-carousel__pagination-button"
        type="button"
        :aria-selected="isActiveSlide(index)"
        :style="{
          background: isActiveSlide(index) ? colorActive : color,
        }"
        @click.prevent="navigateSlides(index)"
      >
        {{ slide }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    slides: {
      type: Number,
      required: true,
    },
    currentSlide: {
      type: Number,
      required: true,
    },
    margin: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    colorActive: {
      type: String,
      required: true,
    },
  },
  methods: {
    navigateSlides(index) {
      this.$emit('navigationEvent', index);
    },
    isActiveSlide(index) {
      return this.currentSlide === index;
    },
  },
};
</script>

<style lang="scss">
.vs-carousel__pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 10px;

  &-item {
    margin: 0;
  }

  &-button {
    display: block;
    cursor: pointer;
    padding: 0;
    border-radius: 50%;
    text-indent: -9999px;
    border: none;
    width: 14px;
    height: 14px;
    transition: background .3s ease;
  }
}
</style>
