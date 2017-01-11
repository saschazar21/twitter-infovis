<script>
export default {
  name: 'Modal',
  data: () => ({
    open: false
  }),
  props: {
    canHide: {
      type: Boolean,
      default: true
    },
    closeButton: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    hide() {
      this.open = false
    },
    hideFromOverlay() {
      if (this.canHide) {
        this.open = false
      }
    },
    show() {
      this.open = true
    }
  }
}
</script>

<template>
<div>
  <transition name="fade-modal">
    <div class="app-modal modal" :class="{ open: open }" v-if="open">
      <div class="modal-content">
        <h5 class="blue-grey-text"><slot name="title"></slot></h5>
        <br>
        <p class="black-text">
          <slot name="content"></slot>
        </p>
      </div>
      <div class="modal-footer">
        <slot name="footer"></slot>
        <span v-if="closeButton" class="modal-action modal-close waves-effect waves-teal btn-flat" @click="hide">Close</span>
      </div>
    </div>
  </transition>
  <transition name="fade-modal-overlay">
    <div class="modal-overlay" id="materialize-modal-overlay-6" v-if="open" @click="hideFromOverlay"></div>
  </transition>
</div>
</template>

<style scoped>
.app-modal {
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
</style>
