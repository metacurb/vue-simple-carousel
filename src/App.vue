<template>
  <div id="app">
    <Carousel
      slideSpeed="500"
    >
      <Slide>
        <img src="@/assets/images/birdcage.jpg">
      </Slide>
      <Slide>
        <img src="@/assets/images/rain-coats.jpg">
      </Slide>
      <Slide>
        <img src="@/assets/images/man-on-bench.jpg">
      </Slide>
      <Slide>
        <img src="@/assets/images/birdcage.jpg">
      </Slide>
      <Slide>
        <img src="@/assets/images/rain-coats.jpg">
      </Slide>
      <Slide>
        <img src="@/assets/images/man-on-bench.jpg">
      </Slide>
    </Carousel>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel.vue';
import Slide from '@/components/Slide.vue';

export default {
  name: 'app',
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      images: [
        '@/assets/images/birdcage.jpg',
        '@/assets/images/man-on-bench.jpg',
        '@/assets/images/trench-coat.jpg',
      ],
    };
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  margin: 0 auto;
  max-width: 600px;
}
</style>
