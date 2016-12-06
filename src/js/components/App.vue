<script>
  import { AnimationBuilder } from 'css-animator/builder'
  import { Socket } from '../services'
  import Nav from './Nav.vue'

  export default {
    name: 'App',
    components: {
      AppNav: Nav
    },
    beforeCreate() {
      Socket.on('connect_error', err => {

      })


      Socket.on('connect_timeout', () => {

      })

      Socket.on('reconnect', number => {

      })

      Socket.on('reconnect_attempt', () => {

      })

      Socket.on('reconnecting', number => {

      })

      Socket.on('reconnect_error', err => {

      })

      Socket.on('reconnect_failed', () => {

      })
    },
    mounted() {
      let animator = new AnimationBuilder()
      let element = document.getElementById('app-loading')

      animator
        .setType('fadeOut')
        .setDelay(500)
        .setDuration(500)
        .hide(element)
        .then(() => {
          element.classList.remove('running');
        })
    },
    destroyed() {
      Socket.removeAllListeners()
    }
  }
</script>

<template>
  <div class="container">
    <app-nav></app-nav>
    <router-view></router-view>
  </div>
</template>
