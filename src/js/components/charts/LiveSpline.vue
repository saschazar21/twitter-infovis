<script>
import Highcharts from 'highcharts'

export default {
  name: 'LiveSpline',
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      Highcharts.setOptions({
        global: {
          useUTC: false
        }
      });

      const chart = Highcharts.chart('chart-container-spline', {
        chart: {
          type: 'spline',
          animation: Highcharts.svg, // don't animate in old IE
          marginRight: 10,
          events: {

          }
        },
        credits: {
          enabled: false
        },
        title: {
          text: ''
        },
        xAxis: {
          type: 'datetime',
          tickPixelInterval: 150
        },
        yAxis: {
          title: {
            text: 'Tweets'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },
        tooltip: {
          formatter: function() {
            return '<b>' + this.series.name + '</b><br/>' +
              Highcharts.dateFormat('%H:%M:%S', this.x) + '<br/>' +
              Highcharts.numberFormat(this.y, 0);
          }
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        series: [{
          name: 'Tweets',
          data: (function() {
            // generate an array of random data
            var data = [],
              time = (new Date()).getTime(),
              i;

            for (i = -19; i <= 0; i += 1) {
              data.push({
                x: time + i * 1000,
                y: 0
              });
            }
            return data;
          }())
        }]
      })

      let series = chart.series[0];
      setInterval(() => {
        let x = (new Date()).getTime() // current time
        let y = Math.round(Math.random() * 10)
        series.addPoint([x, y], true, true)
      }, 1000)
    }
  }
}
</script>

<template>
<div id="chart-container-spline">
</template>
