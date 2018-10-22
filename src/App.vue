<template>
  <div id="app">
    <Carousel
      :autoplay="true"
      :autoplayCycleFrequency="4000"
      autoplayDirection="right"
      :autoplayPauseOnHover="true"
      :minDrag="300"
      navigationColor="purple"
      :navigationEnabled="false"
      :navigationPadding="10"
      :navigationSize="100"
      paginationColor="tan"
      paginationColorActive="tomato"
      :paginationEnabled="false"
      :paginationMargin="50"
      :pointerEventsEnabled="false"
      slideEasing="ease-in-out"
      :slideSpeed="1000"
    >
      <Slide>
        <img
          draggable="false"
          src="@/assets/images/birdcage.jpg"
        >
      </Slide>
      <Slide>
        <img
          draggable="false"
          src="@/assets/images/rain-coats.jpg"
        >
      </Slide>
      <Slide>
        <img
          draggable="false"
          src="@/assets/images/man-on-bench.jpg"
        >
      </Slide>
      <Slide>
        <img
          draggable="false"
          src="@/assets/images/birdcage.jpg"
        >
      </Slide>
      <Slide>
        <img
          draggable="false"
          src="@/assets/images/rain-coats.jpg"
        >
      </Slide>
      <Slide>
        <img
          draggable="false"
          src="@/assets/images/man-on-bench.jpg"
        >
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
  // max-width: 600px;
}
</style>
