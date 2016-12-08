<script>
export default {
  name: 'Controls',
  data: () => ({
    chips: [],
    chipsPlaceholder: 'Enter a tag to track and hit enter',
    chipsShortPlaceholder: '+Tag',
    value: ''
  }),
  methods: {
    addChip() {
      // TODO: Parse valid hashtag from passed string
      this.chips.push(this.value.trim().replace(/^(#)/, '').replace(/\s+/g, ''))
      this.value = ''
    },
    removeChip(index) {
      this.chips.splice(index, 1)
    },
    removePrevChip() {
      if (!this.value.length) {
        this.chips.splice(-1, 1)
      }
    },
    focus() {
      this.$refs.tagsInput.focus()
    }
  },
  computed: {
    limitReached() {
      return this.chips.length >= 5
    },
    placeholderText() {
      if (this.limitReached) {
        return ''
      }

      if (this.chips.length) {
        return this.chipsShortPlaceholder
      }

      return this.chipsPlaceholder
    }
  }
}
</script>

<template>
<div>
  <div class="row">
    <div class="col s12">
      <div class="card white">
        <div class="card-content center-align black-text">
          <span class="card-title cyan-text">Choose Twitter Tags</span>

          <blockquote>
            Enter up to five tags below and we'll stream live data from the
            <a class="btn-flat" href="https://dev.twitter.com/streaming/overview" target="_blank">Twitter API</a> to visualize it with the power of <a class="btn-flat" href="https://vuejs.org" target="_blank">Vue</a> and <a class="btn-flat" href="http://www.highcharts.com"
                target="_blank">Highcharts</a> for you. Enjoy <span class="red-text text-lighten-2">&hearts;</span>
          </blockquote>

          <div class="row answers left-align">
            <div class="col s12 m2 hide-on-small-only"></div>
            <div class="col s12 m8" @click="focus">
              <div class="chips chips-placeholder" :style="{ 'border-bottom-color': chips.length ? 'transparent' : null }">
                <div class="chip" v-for="(chip, index) in chips">
                  #{{ chip }}<i class="material-icons close" @click="removeChip(index)">close</i>
                </div>
                <input class="input" ref="tagsInput" :readonly="limitReached" :placeholder="placeholderText" :style="{ width: !chips.length ? '250px !important' : limitReached ? '0 !important' : '120px !important' }" @keydown.enter="addChip" @keydown.delete="removePrevChip"
                    v-model="value">
              </div>
            </div>
            <div class="col s12 m2 hide-on-small-only"></div>
            <div class="col s12 center-align">
              <transition name="fade-button">
                <span v-if="chips.length" class="btn start-button waves-effect waves-light">Start Stream</span>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.start-button {
  margin-top: 15px;
}

.chips {
  margin-top: 1rem;
}

.card blockquote {
  max-width: 36rem;
  margin: 15px auto 25px auto;
  line-height: 1.7;
}

.card blockquote a.btn-flat {
  margin: 0;
  height: 20px;
  padding: 0 5px;
  line-height: 20px;
  margin-top: -2px;
}

.fade-button-enter-active {
  animation: fadeInDown 0.3s;
}

.fade-button-leave-active {
  animation: fadeOutUp 0.3s;
}
</style>
