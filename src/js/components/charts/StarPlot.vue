<script>
import Highcharts from 'highcharts'
import SolidGaugeChart from 'highcharts/modules/solid-gauge'
SolidGaugeChart(Highcharts)

export default {
  name: 'StarPlot',
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      const chart = Highcharts.chart('chart-container-star', {

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
          categories: ['#tag1', '#tag2', '#tag3', '#tag4', '#tag5'],
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
          data: [43000, 19000, 20000, 35000, 17000],
          pointPlacement: 'on'
        }]

      })

      setInterval(() => {
        let point = chart.series[0].points[0]
        let point2 = chart.series[0].points[1]
        let newVal = point.y + 10000
        let newVal2 = point2.y + 5000
        point.update(newVal)
        setTimeout(() => {
          point2.update(newVal2)
        }, 500)
      }, 2000)
    }
  }
}
</script>

<template>
<div id="chart-container-star">
</div>
</template>
