<script>
import { AnimationBuilder } from 'css-animator/builder'
import { Socket } from '../services'
import Nav from './Nav.vue'

export default {
  name: 'App',
  data: () => ({
    errorModalVisible: false,
    errorMessage: 'Sorry, there was an error.',
    errorDetail: ''
  }),
  components: {
    AppNav: Nav
  },
  created() {
    Socket.on('connect', err => {
      this.resetError()
    })

    Socket.on('error', err => {
      this.errorMessage = 'There was an error with the socket connection.'
      this.errorDetail = ''
      this.errorModalVisible = true
    })


    Socket.on('connect_timeout', () => {
      this.errorMessage = 'Socket connection timed out.'
      this.errorDetail = ''
      this.errorModalVisible = true
    })

    Socket.on('reconnect', number => {
      this.resetError()
    })

    Socket.on('reconnect_attempt', () => {

    })

    Socket.on('reconnecting', number => {
      this.errorMessage = 'Socket connection lost.'
      this.errorDetail = `Trying to reconnect now... (attempt ${number})`
    })

    Socket.on('reconnect_error', err => {
      this.errorModalVisible = true
    })

    Socket.on('reconnect_failed', () => {
      this.errorDetail = 'Reconnecting failed. Please reload the page.'
      this.errorModalVisible = true
    })

    Socket.on('stream_recovered', () => {
      this.resetError()
    })

    Socket.on('stream_error', () => {
      this.errorMessage = 'There was an error with the Twitter stream.'
      this.errorDetail = 'There may be too many concurrent connectins.'
      this.errorModalVisible = true
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
  },
  methods: {
    triggerError(error, detail) {
      this.setError(error, detail)
      this.showErrorModal()
    },
    setError(error, detail) {
      this.errorMessage = error
      this.errorDetail = detail
    },
    resetError() {
      this.hideErrorModal()
      this.setError('', '')
    },
    showErrorModal() {
      this.errorModalVisible = true
    },
    hideErrorModal() {
      this.errorModalVisible = false
    }
  }
}
</script>

<template>
<div class="container">
  <transition name="fade-nav" appear>
    <app-nav></app-nav>
  </transition>
  <transition name="fade-route" appear>
    <router-view></router-view>
  </transition>

  <transition name="fade-modal">
    <div class="error-modal modal open" v-if="errorModalVisible">
      <div class="modal-content">
        <h5 class="blue-grey-text">{{ errorMessage }}</h5>
        <br>
        <p class="black-text">{{ errorDetail }}</p>
      </div>
      <div class="modal-footer">
        <!-- <span class="modal-action modal-close waves-effect waves-teal btn-flat">Close</span> -->
        <span class="waves-effect waves-teal btn-flat" onclick="window.location.reload(false)">Reload Page Now</span>
      </div>
    </div>
  </transition>
  <transition name="fade-modal-overlay">
    <div class="modal-overlay" id="materialize-modal-overlay-6" v-if="errorModalVisible"></div>
  </transition>
</div>
</template>

<style scoped>
.error-modal {
  z-index: 1003;
  display: block;
  opacity: 1;
  transform: scaleX(1);
  top: 10%;
}

.modal-overlay {
  z-index: 1002;
  display: block;
  opacity: 1;
  background: rgba(0, 0, 0, 0.6);
}

.fade-modal-enter-active {
  opacity: 0;
  animation: fadeInUp 0.5s;
}

.fade-modal-overlay-enter-active {
  opacity: 0;
  animation: fadeIn 0.3s;
}

.fade-modal-leave-active {
  opacity: 0;
  animation: fadeOutDown 0.3s;
}

.fade-modal-overlay-leave-active {
  opacity: 0;
  animation: fadeOut 0.3s;
}

.fade-nav-enter-active {
  opacity: 0;
  animation: fadeInDown 0.8s ease 0.8s;
}

.fade-nav-leave-active {
  opacity: 1;
  animation: fadeOutUp 0.5s;
}

.fade-route-enter-active {
  opacity: 0;
  animation: fadeInUp 0.7s ease 1s;
}

.fade-route-leave-active {
  opacity: 1;
  animation: fadeOutDown 0.5s ease-out;
}
</style>
