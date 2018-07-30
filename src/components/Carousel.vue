<template>
  <div class="vs-carousel">
    <div class="vs-carousel--viewfinder">
      <div
        class="vs-carousel--slides"
        :style="{
          'transform': slideTransform,
          '-webkit-transform': slideTransform,
          'transition': slideTransition,
          'width': carouselWidth,
        }"
      >
        <slot></slot>
      </div>
    </div>

    <Navigation
      v-if="navigationEnabled"
      :canNavigateLeft="canNavigateLeft"
      :canNavigateRight="canNavigateRight"
      :color="navigationColor"
      :size="navigationSize"
      @navigationEvent="navigationHandler"
    />

    <Pagination
      v-if="paginationEnabled"
      :margin="paginationMargin"
      :color="paginationColor"
      :colorActive="paginationColorActive"
      :slides="numberOfSlides"
      :currentSlide="currentSlide"
      @navigationEvent="slideTo"
    />

  </div>
</template>

<script>
import supports from 'supports.js';
import Navigation from './Navigation.vue';
import Pagination from './Pagination.vue';

export default {
  name: 'Carousel',
  components: {
    Navigation,
    Pagination,
  },
  props: {
    slideSpeed: {
      type: String,
      default: '2000',
    },
    slideEasing: {
      type: String,
      default: 'ease',
    },
    navigationEnabled: {
      type: Boolean,
      default: true,
    },
    navigationColor: {
      type: String,
      default: '#000',
    },
    navigationSize: {
      type: Number,
      default: 30,
    },
    paginationEnabled: {
      type: Boolean,
      default: true,
    },
    paginationColor: {
      type: String,
      default: '#aaa',
    },
    paginationColorActive: {
      type: String,
      default: '#000',
    },
    paginationMargin: {
      type: Number,
      default: 6,
    },
    touchEventsEnabled: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentSlide: 0,
    };
  },
  mounted() {
    window.addEventListener('resize', this.resizeEvent);
    console.log(supports.touchevents);
  },
  methods: {
    slideTo(newSlide) {
      this.currentSlide = newSlide;
    },
    navigationHandler(direction) {
      if (direction === 'left' && this.canNavigateLeft) this.slideTo(this.currentSlide - 1);
      else if (direction === 'right' && this.canNavigateRight) this.slideTo(this.currentSlide + 1);
    },
    resizeEvent() {
      console.log('resize');
    },
  },
  computed: {
    canNavigateLeft() {
      return this.currentSlide !== 0;
    },
    canNavigateRight() {
      return this.currentSlide < this.numberOfSlides - 1;
    },
    slideTransform() {
      const percentage = (this.currentSlide / this.numberOfSlides) * 100;
      return `translateX(-${percentage}%)`;
    },
    slideTransition() {
      return `transform ${this.slideSpeed / 1000}s ${this.slideEasing}`;
    },
    carouselWidth() {
      return `${this.numberOfSlides * 100}%`;
    },
    numberOfSlides() {
      return this.$slots &&
        this.$slots.default &&
        this.$slots.default.filter(slot => slot.componentOptions.tag === 'Slide').length;
    },
  },
};
</script>

<style lang="scss">
.vs-carousel {
  position: relative;

  &--viewfinder {
    overflow: hidden;
  }

  &--slides {
    display: flex;
  }
}
</style>
