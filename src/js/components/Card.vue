<script>
export default {
  name: 'Card',
  props: {
    size: {
      type: String,
      default: 's12 m6'
    }
  }
}
</script>

<template>
<div>
  <div :class="`col ${size}`">
    <div class="card white">
      <div class="card-content center-align black-text">
        <span class="card-title">
              <slot name="title"></slot>
            </span>
        <div class="row">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
