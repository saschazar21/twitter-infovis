<script>
import Controls from './Controls.vue'
import Card from './Card.vue';

import SolidGauge from './charts/SolidGauge.vue'
import StarPlot from './charts/StarPlot.vue'
import LiveSpline from './charts/LiveSpline.vue'

export default {
  name: 'Home',
  components: {
    AppControls: Controls,
    AppCard: Card,
    ChartSolidGauge: SolidGauge,
    ChartStarPlot: StarPlot,
    ChartLiveSpline: LiveSpline
  },
  data: () => ({

  })
}
</script>

<template>
<div>
  <app-controls></app-controls>
  <div class="row">
    <app-card size="s12 m6">
      <div slot="content">
        <chart-solid-gauge></chart-solid-gauge>
      </div>
    </app-card>

    <app-card size="s12 m6">
      <div slot="content">
        <chart-star-plot></chart-star-plot>
      </div>
    </app-card>

    <app-card size="s12 m6">
      <div slot="content">
        <chart-live-spline></chart-live-spline>
      </div>
    </app-card>
  </div>
</div>
</template>
