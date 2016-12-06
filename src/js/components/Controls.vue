<script>
export default {
  name: 'Controls',
  data: () => ({
    chips: [],
    chipsPlaceholder: 'Enter tags to track',
    chipsShortPlaceholder: '+Tag',
    value: ''
  }),
  methods: {
    addChip() {
      this.chips.push(this.value.replace(/^(#)/, ''))
      this.value = ''
    },
    removeChip(index) {
      this.chips.splice(index, 1)
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
          <div class="row answers left-align">
            <div class="col s12 m2 hide-on-small-only"></div>
            <div class="col s12 m8">
              <div class="chips chips-placeholder">
                <div class="chip" v-for="(chip, index) in chips">
                  #{{ chip }}<i class="material-icons close" @click="removeChip(index)">close</i>
                </div>
                <input :readonly="limitReached" class="input"
                  :placeholder="placeholderText"
                  @keydown.enter="addChip"
                  v-model="value"
                >
              </div>
            </div>
            <div class="col s12 m2 hide-on-small-only"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
  .chips {
    margin-top: 1rem;
  }
  .chips > input {
    width: 125px !important;
  }
</style>
