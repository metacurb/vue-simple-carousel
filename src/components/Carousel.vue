<template>
  <div
    class="vs-carousel"
    ref="carousel"
    :style="{
      'margin': carouselMargin,
    }"
  >
    <div
      class="vs-carousel--viewfinder"
      ref="viewfinder"
    >
      <div
        class="vs-carousel--slides"
        ref="slides"
        :style="{
          'transform': `translateX(${slideTransform}px)`,
          '-webkit-transform': `translateX(${slideTransform}px)`,
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
      :padding="navigationPadding"
      :size="navigationSize"
      @navigationEvent="navigationHandler($event, 'navigation')"
    />

    <Pagination
      v-if="paginationEnabled"
      :color="paginationColor"
      :colorActive="paginationColorActive"
      :currentSlide="currentSlide"
      :margin="paginationMargin"
      :slides="numberOfSlides"
      @navigationEvent="slideTo($event, 'pagination')"
    />

  </div>
</template>

<script>
import Navigation from './Navigation.vue';
import Pagination from './Pagination.vue';

export default {
  name: 'Vue-Simple-Carousel',
  components: {
    Navigation,
    Pagination,
  },
  props: {
    autoplay: {
      type: Boolean,
      default: false,
    },
    autoplayCycleFrequency: {
      type: Number,
      default: 4000,
    },
    autoplayDirection: {
      type: String,
      default: 'right',
    },
    autoplayPauseOnHover: {
      type: Boolean,
      default: true,
    },
    infiniteCycle: {
      type: Boolean,
      default: false,
    },
    minDrag: {
      type: Number,
      default: 100,
    },
    navigationColor: {
      type: String,
      default: '#000',
    },
    navigationEnabled: {
      type: Boolean,
      default: true,
    },
    navigationPadding: {
      type: Number,
      default: 16,
    },
    navigationSize: {
      type: Number,
      default: 30,
    },
    paginationColor: {
      type: String,
      default: '#aaa',
    },
    paginationColorActive: {
      type: String,
      default: '#000',
    },
    paginationEnabled: {
      type: Boolean,
      default: true,
    },
    paginationMargin: {
      type: Number,
      default: 6,
    },
    pointerEventsEnabled: {
      type: Boolean,
      default: true,
    },
    slideEasing: {
      type: String,
      default: 'ease',
    },
    slideSpeed: {
      type: Number,
      default: 2000,
    },
  },
  data() {
    return {
      autoplayFn: null,
      currentSlide: 0,
      dragging: false,
      dragOffset: 0,
      dragPosStart: 0,
      viewfinderWidth: 0,
    };
  },
  mounted() {
    window.addEventListener('resize', this.onResize);
    this.initPointerEvents();
    this.getViewfinderWidth();
    this.autoplayInit();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    autoplayInit() {
      if (!this.autoplay) return;
      if (this.autoplayPauseOnHover) {
        this.autoplayStart();
        this.$refs.viewfinder.addEventListener('pointerenter', this.autoplayStop, false);
        this.$refs.viewfinder.addEventListener('pointerleave', this.autoplayStart, false);
      }
    },
    autoplayStart() {
      this.autoplayFn = setInterval(() => this.navigationHandler(this.autoplayDirection, 'autoplay'), this.autoplayCycleFrequency);
    },
    autoplayStop() {
      if (this.autoplayFn) this.autoplayFn = clearInterval(this.autoplayFn);
    },
    getViewfinderWidth() {
      this.viewfinderWidth = parseInt(this.$refs.slides.offsetWidth, 10);
    },
    initPointerEvents() {
      if (!this.dragEnabled) return;
      this.$refs.viewfinder.addEventListener('pointerdown', this.onPointerDown, false);
    },
    navigationHandler(direction, navigationType) {
      if (direction === 'left' && this.canNavigateLeft) {
        const nextSlide = this.infiniteCycle && this.isFirstSlide ?
          this.numberOfSlides - 1 :
          this.currentSlide - 1;
        this.slideTo(nextSlide, navigationType);
      } else if (direction === 'right' && this.canNavigateRight) {
        const nextSlide = this.infiniteCycle && this.isLastSlide ?
          0 :
          this.currentSlide + 1;
        this.slideTo(nextSlide, navigationType);
      }
    },
    onPointerDown(event) {
      this.dragPosStart = event.clientX;
      window.addEventListener('pointermove', this.onPointerMove, false);
      window.addEventListener('pointerup', this.onPointerUp, false);
      window.addEventListener('pointerleave', this.onPointerUp, false);
    },
    onPointerMove(event) {
      const newOffset = event.clientX - this.dragPosStart;
      if (!this.canNavigateLeft && newOffset > 0) return;
      if (!this.canNavigateRight && newOffset < 0) return;
      this.dragging = true;
      this.dragOffset = newOffset;
    },
    onPointerUp() {
      if (Math.abs(this.dragOffset) >= this.minDrag) this.navigationHandler(this.navigationDirection, 'swipe');
      this.dragPosStart = 0;
      this.dragOffset = 0;
      this.dragging = false;
      window.removeEventListener('pointermove', this.onPointerMove, false);
      window.removeEventListener('pointerup', this.onPointerUp, false);
      window.removeEventListener('pointerleave', this.onPointerUp, false);
    },
    onResize() {
      this.getViewfinderWidth();
    },
    slideTo(newSlide, navigationType) {
      this.$emit('onNavigation', {
        currentSlide: newSlide + 1,
        previousSlide: this.currentSlide + 1,
        isFirstSlide: newSlide === 0,
        isLastSlide: newSlide + 1 === this.numberOfSlides,
        navigationType,
      });
      this.currentSlide = newSlide;
    },
  },
  computed: {
    canNavigateLeft() {
      return this.infiniteCycle || this.currentSlide !== 0;
    },
    canNavigateRight() {
      return this.infiniteCycle || this.currentSlide < this.numberOfSlides - 1;
    },
    carouselMargin() {
      if (!this.navigationEnabled) return null;
      const margin = this.navigationSize + (this.navigationPadding * 2);
      return `0 ${margin}px`;
    },
    carouselWidth() {
      return `${this.numberOfSlides * 100}%`;
    },
    isFirstSlide() {
      return this.currentSlide === 0;
    },
    isLastSlide() {
      return this.currentSlide + 1 === this.numberOfSlides;
    },
    navigationDirection() {
      if (this.dragOffset < 0) return 'right';
      return 'left';
    },
    numberOfSlides() {
      return this.$slots &&
        this.$slots.default &&
        this.$slots.default.filter(slot => slot.componentOptions.tag === 'Slide').length;
    },
    slideTransform() {
      const slidePosition = this.currentSlide * this.slideWidth * -1;
      return this.dragOffset + slidePosition;
    },
    slideTransition() {
      return this.dragging ? 'none' : `transform ${this.slideSpeed / 1000}s ${this.slideEasing}`;
    },
    slideWidth() {
      return this.viewfinderWidth / this.numberOfSlides;
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
