<script>
  import { AnimationBuilder } from 'css-animator/builder';

  export default {
    name: 'App',
    mounted() {
      let animator = new AnimationBuilder();
      let element = document.getElementById('app-loading');

      animator
        .setType('fadeOut')
        .setDelay(500)
        .setDuration(500)
        .hide(element)
        .then(() => {
          element.classList.remove('running');
        });
    }
  }
</script>

<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>
