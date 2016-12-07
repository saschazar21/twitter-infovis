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
        //,
        // drilldown: {
        //   series: [{
        //     name: 'Microsoft Internet Explorer',
        //     id: 'Microsoft Internet Explorer',
        //     data: [
        //       [
        //         'v11.0',
        //         24.13
        //       ],
        //       [
        //         'v8.0',
        //         17.2
        //       ],
        //       [
        //         'v9.0',
        //         8.11
        //       ],
        //       [
        //         'v10.0',
        //         5.33
        //       ],
        //       [
        //         'v6.0',
        //         1.06
        //       ],
        //       [
        //         'v7.0',
        //         0.5
        //       ]
        //     ]
        //   }, {
        //     name: 'Chrome',
        //     id: 'Chrome',
        //     data: [
        //       [
        //         'v40.0',
        //         5
        //       ],
        //       [
        //         'v41.0',
        //         4.32
        //       ],
        //       [
        //         'v42.0',
        //         3.68
        //       ],
        //       [
        //         'v39.0',
        //         2.96
        //       ],
        //       [
        //         'v36.0',
        //         2.53
        //       ],
        //       [
        //         'v43.0',
        //         1.45
        //       ],
        //       [
        //         'v31.0',
        //         1.24
        //       ],
        //       [
        //         'v35.0',
        //         0.85
        //       ],
        //       [
        //         'v38.0',
        //         0.6
        //       ],
        //       [
        //         'v32.0',
        //         0.55
        //       ],
        //       [
        //         'v37.0',
        //         0.38
        //       ],
        //       [
        //         'v33.0',
        //         0.19
        //       ],
        //       [
        //         'v34.0',
        //         0.14
        //       ],
        //       [
        //         'v30.0',
        //         0.14
        //       ]
        //     ]
        //   }, {
        //     name: 'Firefox',
        //     id: 'Firefox',
        //     data: [
        //       [
        //         'v35',
        //         2.76
        //       ],
        //       [
        //         'v36',
        //         2.32
        //       ],
        //       [
        //         'v37',
        //         2.31
        //       ],
        //       [
        //         'v34',
        //         1.27
        //       ],
        //       [
        //         'v38',
        //         1.02
        //       ],
        //       [
        //         'v31',
        //         0.33
        //       ],
        //       [
        //         'v33',
        //         0.22
        //       ],
        //       [
        //         'v32',
        //         0.15
        //       ]
        //     ]
        //   }, {
        //     name: 'Safari',
        //     id: 'Safari',
        //     data: [
        //       [
        //         'v8.0',
        //         2.56
        //       ],
        //       [
        //         'v7.1',
        //         0.77
        //       ],
        //       [
        //         'v5.1',
        //         0.42
        //       ],
        //       [
        //         'v5.0',
        //         0.3
        //       ],
        //       [
        //         'v6.1',
        //         0.29
        //       ],
        //       [
        //         'v7.0',
        //         0.26
        //       ],
        //       [
        //         'v6.2',
        //         0.17
        //       ]
        //     ]
        //   }, {
        //     name: 'Opera',
        //     id: 'Opera',
        //     data: [
        //       [
        //         'v12.x',
        //         0.34
        //       ],
        //       [
        //         'v28',
        //         0.24
        //       ],
        //       [
        //         'v27',
        //         0.17
        //       ],
        //       [
        //         'v29',
        //         0.16
        //       ]
        //     ]
        //   }]
        // }
      })

      return chart
    }
  }
}
</script>

<template>
<div id="chart-container-bar"></div>
</template>
