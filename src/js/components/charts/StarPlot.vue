<script>
import Highcharts from 'highcharts'
import SolidGaugeChart from 'highcharts/modules/solid-gauge'
SolidGaugeChart(Highcharts)

import { Bus, StreamService } from '../../services'

export default {
  name: 'StarPlot',
  data: () => ({
    chart: null
  }),
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    init() {
      this.chart = this.initChart(StreamService.tags)
      Bus.$on('reset', this.onReset)
      Bus.$on('update', this.onUpdate)
    },
    destroy() {
      Bus.$off('reset', this.onReset)
      Bus.$off('update', this.onUpdate)
      this.chart.destroy()
      this.chart = null
    },
    onReset() {
      let points = this.chart.series[0].points
      for (let i = 0; i < points.length; i++) {
        points[i].update(0)
      }
    },
    onUpdate(data) {
      let count = 0;
      for (let tag in data.tags) {
        if (data.tags.hasOwnProperty(tag)) {
          let point = this.chart.series[0].points[count++]
          point.update(data.tags[tag].count)
        }
      }
    },
    initChart(tags) {
      const chart = Highcharts.chart(this.$el, {

        chart: {
          polar: true,
          type: 'line'
        },

        credits: {
          enabled: false
        },

        title: {
          text: ''
        },

        pane: {
          size: '100%',
          center: ['50%', '60%'],
        },

        xAxis: {
          categories: tags.map(tag => {
            return `#${tag}`
          }),
          tickmarkPlacement: 'on',
          lineWidth: 0
        },

        yAxis: {
          gridLineInterpolation: 'polygon',
          lineWidth: 0,
          min: 0
        },

        tooltip: {
          shared: true,
          pointFormat: '<span><b>{point.y:,.0f}</b> tweets<br/>'
        },

        // legend: {
        //   align: 'right',
        //   verticalAlign: 'top',
        //   y: 70,
        //   layout: 'vertical'
        // },

        series: [{
          name: 'Tweets',
          type: 'area',
          data: tags.map(tag => 0),
          pointPlacement: 'on'
        }]

      })

      // setInterval(() => {
      //   let point = chart.series[0].points[0]
      //   let point2 = chart.series[0].points[1]
      //   let newVal = point.y + 10000
      //   let newVal2 = point2.y + 5000
      //   point.update(newVal)
      //   setTimeout(() => {
      //     point2.update(newVal2)
      //   }, 500)
      // }, 2000)

      return chart
    }
  }
}
</script>

<template>
<div>
</div>
</template>
