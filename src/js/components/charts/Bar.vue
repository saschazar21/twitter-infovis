<script>
import Highcharts from 'highcharts'

export default {
  name: 'Bar',
  data: () => ({
    chart: null
  }),
  mounted() {
    this.chart = this.initChart()
  },
  beforeDestroy() {
    this.chart.destroy()
    this.chart = null
  },
  methods: {
    initChart() {
      const chart = Highcharts.chart('chart-container-bar', {
        chart: {
          type: 'column'
        },
        credits: {
          enabled: false
        },
        title: {
          text: ''
        },
        subtitle: {
          text: ''
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: 'Tweets'
          }

        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: '{point.y}'
            }
          }
        },

        tooltip: {
          // headerFormat: '',
          pointFormat: '<span><b>{point.y:,.0f}</b> tweets<br/>'
        },

        series: [{
          name: 'Tweets',
          colorByPoint: true,
          data: [{
            name: '#tag1',
            y: 56,
            drilldown: '#tag1',
            color: 'rgb(136, 179, 231)'
          }, {
            name: '#tag2',
            y: 33,
            drilldown: '#tag2',
            color: 'rgb(166, 234, 138)'
          }, {
            name: '#tag3',
            y: 10,
            drilldown: '#tag3',
            color: 'rgb(235, 167, 104)'
          }, {
            name: '#tag4',
            y: 8,
            drilldown: '#tag4',
            color: 'rgb(224, 102, 129)'
          }, {
            name: '#tag5',
            y: 24,
            drilldown: '#tag5',
            color: 'rgb(75, 142, 142)'
          }]
        }]
      })

      setInterval(() => {

      }, 1000)

      return chart
    }
  }
}
</script>

<template>
<div id="chart-container-bar"></div>
</template>
