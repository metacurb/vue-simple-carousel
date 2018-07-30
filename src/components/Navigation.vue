<template>
  <div class="vs-carousel--navigation">
    <button
      type="button"
      class="vs-carousel--navigation_control left"
      :class="{ 'vs-carousel--navigation_disabled': !canNavigateLeft }"
      :disabled="!canNavigateLeft"
      :style="{
        width: navigationSize,
        height: navigationSize,
      }"
      @click.prevent="navigateSlides('left')"
    >
      <div
        class="vs-carousel--navigation_arrow"
        :style="{
          'height': navigationArrowSize,
          'width': navigationArrowSize,
          'border-width': navigationArrowBorder,
        }"
        ></div>
    </button>
    <button
      type="button"
      class="vs-carousel--navigation_control right"
      :class="{ 'vs-carousel--navigation_disabled': !canNavigateRight }"
      :disabled="!canNavigateRight"
      :style="{
        width: navigationSize,
        height: navigationSize,
      }"
      @click.prevent="navigateSlides('right')"
    >
      <div
        class="vs-carousel--navigation_arrow"
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
    size: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  methods: {
    navigateSlides(direction) {
      this.$emit('navigationEvent', direction);
    },
  },
  computed: {
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
.vs-carousel--navigation {

  &_control {
    cursor: pointer;
    box-sizing: content-box;
    position: absolute;
    top: 50%;
    padding: 16px;
    border: none;
    background: transparent;
    transition: all .3s;

    &.left {
      left: 0;
      transform: translate(-100%, -50%) rotate(180deg);
    }

    &.right {
      left: 100%;
      transform: translateY(-50%);
    }

    &:disabled {
      opacity: 0.2;
    }
  }

  &_arrow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-75%, -50%) rotate(-45deg);
    width: 15px;
    height: 15px;
    border: 1px solid #000;
    border-top: 0;
    border-left: 0;
  }
}

</style>
