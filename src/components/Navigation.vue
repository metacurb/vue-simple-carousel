<template>
  <div
    class="vs-carousel__navigation"
    role="navigation"
  >
    <button
      aria-label="Previous Slide"
      class="vs-carousel__navigation-control vs-carousel__navigation-control--left"
      type="button"
      :class="{ 'vs-carousel__navigation-control--disabled': !canNavigateLeft }"
      :disabled="!canNavigateLeft"
      :style="{
        color,
        'padding': navigationArrowPadding,
        'width': navigationSize,
        'height': navigationSize,
      }"
      @click.prevent="navigateSlides('left')"
    >
      <div
        class="vs-carousel__navigation-arrow"
        :style="{
          'height': navigationArrowSize,
          'width': navigationArrowSize,
          'border-width': navigationArrowBorder,
        }"
        ></div>
    </button>
    <button
      aria-label="Next Slide"
      class="vs-carousel__navigation-control vs-carousel__navigation-control--right"
      type="button"
      :class="{ 'vs-carousel__navigation-control--disabled': !canNavigateRight }"
      :disabled="!canNavigateRight"
      :style="{
        color,
        'padding': navigationArrowPadding,
        'width': navigationSize,
        'height': navigationSize,
      }"
      @click.prevent="navigateSlides('right')"
    >
      <div
        class="vs-carousel__navigation-arrow"
        :style="{
          'height': navigationArrowSize,
          'width': navigationArrowSize,
          'border-width': navigationArrowBorder,
        }"
      ></div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  props: {
    canNavigateLeft: {
      type: Boolean,
      required: true,
    },
    canNavigateRight: {
      type: Boolean,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    padding: {
      type: Number,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  methods: {
    navigateSlides(direction) {
      this.$emit('navigationEvent', direction);
    },
  },
  computed: {
    navigationArrowPadding() {
      return `${this.padding}px`;
    },
    navigationArrowBorder() {
      return `${Math.floor(this.size / 10)}px`;
    },
    navigationArrowSize() {
      return `${this.size / 2}px`;
    },
    navigationSize() {
      return `${this.size}px`;
    },
  },
};
</script>

<style lang="scss">
.vs-carousel__navigation {

  &-control {
    cursor: pointer;
    padding: 0;
    box-sizing: content-box;
    position: absolute;
    top: 50%;
    border: none;
    background: transparent;
    transition: all .3s;

    &--left {
      left: 0;
      transform: translate(-100%, -50%) rotate(180deg);
    }

    &--right {
      left: 100%;
      transform: translateY(-50%);
    }

    &--disabled {
      opacity: 0.2;
    }
  }

  &-arrow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-75%, -50%) rotate(-45deg);
    border: 1px solid currentColor;
    border-top: 0;
    border-left: 0;
  }
}

</style>
