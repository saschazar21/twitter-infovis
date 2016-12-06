<script>
  import { AnimationBuilder } from 'css-animator/builder';
  import Nav from './Nav.vue';

  export default {
    name: 'App',
    components: {
      AppNav: Nav
    },
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
    <app-nav></app-nav>
    <router-view></router-view>
  </div>
</template>
