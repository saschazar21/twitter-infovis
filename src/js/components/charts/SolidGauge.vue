<script>
import Highcharts from 'highcharts'

export default {
  name: 'SolidGauge',
  data: () => ({
    chart: null
  }),
  mounted() {
    this.chart = this.initChart(200)
  },
  beforeDestroy() {
    this.chart.destroy()
    this.chart = null
  },
  methods: {
    initChart(max) {
      let gaugeOptions = this.getChartOptions()

      const chart = Highcharts.chart(this.$el, Highcharts.merge(gaugeOptions, {
        yAxis: {
          min: 0,
          max: max || 100,
          title: {
            text: ''
          }
        },

        credits: {
          enabled: false
        },

        series: [{
          name: 'Speed',
          data: [
            0
          ],
          dataLabels: {
            format: `
              <div style="text-align:center">
                <span style="font-size:25px;color:
                  ${((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black')}"
                >
                  {y}
                </span>
                <br>
                <span style="font-size:12px;color:silver">Tweets/s</span>
              </div>
              `
          },
          tooltip: {
            valueSuffix: ' Tweets/s'
          }
        }]

      }))

      // setInterval(() => {
      //   let point = chart.series[0].points[0]
      //   let newVal = point.y + 20
      //   point.update(newVal)
      //   // chart.yAxis[0].update({
      //   //   max: newVal + 100
      //   // })
      // }, 2000)
    },
    getChartOptions() {
      return {

        chart: {
          type: 'solidgauge'
        },

        title: null,

        pane: {
          center: ['50%', '75%'],
          size: '100%',
          startAngle: -90,
          endAngle: 90,
          background: {
            backgroundColor: (
              Highcharts.theme && Highcharts.theme.background2
            ) || '#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
          }
        },

        tooltip: {
          enabled: false
        },

        // the value axis
        yAxis: {
          stops: [
            [0.1, 'rgb(166, 234, 138)'], // green
            [0.5, 'rgb(250, 237, 128)'], // yellow
            [0.9, 'rgb(233, 133, 155)'] // red
          ],
          lineWidth: 0,
          minorTickInterval: null,
          tickAmount: 5,
          title: {
            y: -70
          },
          labels: {
            y: 16
          }
        },

        plotOptions: {
          solidgauge: {
            dataLabels: {
              y: 5,
              borderWidth: 0,
              useHTML: true
            }
          }
        }
      }

      return chart
    }
  }
}
</script>

<template>
<div>
</div>
</template>
