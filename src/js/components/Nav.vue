<script>
import { Bus, StreamService } from '../services'

export default {
  name: 'Nav',
  data: () => ({
    infoModalVisible: false,
    streamActive: false,
    resetting: false
  }),
  created() {
    Bus.$on('reset', this.onReset)
    Bus.$on('start', this.onStart)
    Bus.$on('end', this.onEnd)
  },
  beforeDestroy() {
    Bus.$off('reset', this.onReset)
    Bus.$off('start', this.onStart)
    Bus.$off('end', this.onEnd)
  },
  methods: {
    onStart() {
      this.streamActive = true
    },
    onEnd() {
      this.streamActive = false
    },
    onReset() {
      this.resetting = false
    },
    end() {
      this.streamActive = false
      setTimeout(() => {
        StreamService.end()
      })
    },
    reset() {
      this.resetting = true
      setTimeout(() => {
        StreamService.reset()
      }, 200)
    },
    showInfo() {
      this.infoModalVisible = true
    },
    hideInfo() {
      this.infoModalVisible = false
    }
  }
}
</script>

<template>
<div class="nav-wrapper">
  <div class="row">
    <div class="col s12">
      <nav>
        <div class="nav-wrapper white black-text">
          <a class="brand-logo cyan-text hide-on-small-only">
            <img src="assets/icons/line_chart.svg" title="logo">
          </a>
          <ul class="right">
            <li><a class="menuitem"><i class="material-icons teal-text text-lighten-1" @click="showInfo">info_outline</i></a></li>
            <li><a class="menuitem" :class="{ resetting: resetting, disabled: resetting || !streamActive }"><i class="material-icons" :class="{ 'blue-grey-text': !resetting && streamActive, 'grey-text': resetting || !streamActive }" @click="reset">refresh</i></a></li>
            <li><a class="menuitem" :class="{ disabled: !streamActive }"><i class="material-icons" :class="{ 'red-text': streamActive, 'grey-text': !streamActive }" @click="end">close</i></a></li>
            <li class="github-button"><a href="https://github.com/fabiandev/vue-twitter-stream-app" target="_blank" class="waves-effect waves-light btn"><i class="material-icons left">code</i>GitHub</a></li>
          </ul>
          <div class="progress">
            <div class="determinate" style="width:0%"></div>
          </div>
        </div>
      </nav>
    </div>
  </div>

  <transition name="fade-modal">
    <div class="info-modal modal open" v-if="infoModalVisible">
      <div class="modal-content">
        <h5 class="blue-grey-text">Information Visualization Project</h5>
        <br>
        <p class="black-text">
          This is a project for the course <strong>Information Visualisation</strong> at the <a href="https://www.fh-ooe.at/en/hagenberg-campus/studiengaenge/master/interactive-media/" target="_blank">University of Applied Sciences Upper Austria Campus Hagenberg</a> by <strong>Fabian Pirklbauer</strong> and <strong>Sascha Zarhuber</strong>.
          To learn more about the project, please head over to our <a href="https://github.com/fabiandev/vue-twitter-stream-app" target="_blank">repository on GitHub</a>.
        </p>
      </div>
      <div class="modal-footer">
        <span class="modal-action modal-close waves-effect waves-teal btn-flat" @click="hideInfo">Close</span>
      </div>
    </div>
  </transition>
  <transition name="fade-modal-overlay">
    <div class="modal-overlay" id="materialize-modal-overlay-6" v-if="infoModalVisible" @click="hideInfo"></div>
  </transition>
</div>
</template>

<style scoped>
@keyframes ldboxrotate {
  to {
		transform: rotate(1turn);
	}
}

.resetting {
  animation-fill-mode: both;
  animation-name: ldboxrotate;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-play-state: running;
  animation-duration: 0.8s;
}

a.menuitem.disabled {
  transition: none;
}

a.menuitem.disabled:hover {
  background: transparent;
  cursor: default;
}

.progress {
  position: absolute;
  border-radius: 0;
  margin: 0;
  background-color: transparent;
  bottom: 0;
}

.nav-wrapper {
  margin-bottom: 0.5rem;
}

.nav-wrapper>.row {
  margin-bottom: 5px;
}

.menuitem {
  cursor: pointer;
}

ul li .btn i {
  font-size: 1.3rem;
  line-height: 36px;
}

ul li a.menuitem:hover {
  background-color: rgba(236, 239, 241, 1);
}

ul li a.btn {
  padding: 0 1.8rem 0 1.3rem;
}

.brand-logo {
  height: 100%;
  left: 0;
}

a.brand-logo {
  cursor: default;
}

.brand-logo img {
  cursor: default;
  height: 1.3em;
  margin-left: 10px;
  display: block;
  position: absolute;
  top: 50%;
  /* put further to top than center */
  margin-top: -0.7em;
}

@media only screen and (max-width: 369px) {
  .github-button {
    display: none;
  }
}

.info-modal {
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
