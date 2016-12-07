<script>
import Controls from './Controls.vue'
import Card from './Card.vue';

import SolidGauge from './charts/SolidGauge.vue'
import StarPlot from './charts/StarPlot.vue'
import LiveSpline from './charts/LiveSpline.vue'
import Bar from './charts/Bar.vue'
import WorldMap from './charts/WorldMap.vue'

export default {
  name: 'Home',
  components: {
    AppControls: Controls,
    AppCard: Card,
    ChartSolidGauge: SolidGauge,
    ChartStarPlot: StarPlot,
    ChartLiveSpline: LiveSpline,
    ChartBar: Bar,
    ChartWorldMap: WorldMap
  },
  data: () => ({

  })
}
</script>

<template>
<div>
  <app-controls></app-controls>
  <div class="row">
    <transition name="card1" appear>
      <app-card size="s12 m6">
        <div slot="content">
          <chart-solid-gauge></chart-solid-gauge>
        </div>
      </app-card>
    </transition>

    <transition name="card2" appear>
      <app-card size="s12 m6">
        <div slot="content">
          <chart-star-plot></chart-star-plot>
        </div>
      </app-card>
    </transition>

    <transition name="card3" appear>
      <app-card size="s12 m6">
        <div slot="content">
          <chart-live-spline></chart-live-spline>
        </div>
      </app-card>
    </transition>

    <transition name="card4" appear>
      <app-card size="s12 m6">
        <div slot="content">
          <chart-bar></chart-bar>
        </div>
      </app-card>
    </transition>

    <transition name="card5" appear>
      <app-card size="s12">
        <div slot="content">
          <chart-world-map></chart-world-map>
        </div>
      </app-card>
    </transition>

  </div>
</div>
</template>

<style scoped>
.card1-enter-active {
  opacity: 0;
  animation: fadeIn 0.6s ease 1.8s;
}
.card2-enter-active {
  opacity: 0;
  animation: fadeIn 0.6s ease 2s;
}
.card3-enter-active {
  opacity: 0;
  animation: fadeIn 0.6s ease 2.2s;
}
.card4-enter-active {
  opacity: 0;
  animation: fadeIn 0.6s ease 2.4s;
}
.card5-enter-active {
  opacity: 0;
  animation: fadeIn 0.6s ease 2.6s;
}
</style>
