<script>
import Highcharts from 'highcharts'
import WorldMap from '../../data/worldmap'
import countries from '../../data/countries'
import Bus from '../../services/bus'

Highcharts.maps['custom/world'] = WorldMap

export default {
  name: 'WorldMap',
  data: () => ({
    chart: null,
    countries: {}
  }),
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.beforeDestroy()
  },
  destroyed() {
    this.destroy()
  },
  methods: {
    init() {
      this.chart = this.initChart()
      Bus.$on('reset', this.onReset)
      Bus.$on('update', this.onUpdate)
    },
    beforeDestroy() {
      Bus.$off('reset', this.onReset)
      Bus.$off('update', this.onUpdate)

      this.countries = {}

      setTimeout(() => {
        this.onReset()
      })
    },
    destroy() {
      setTimeout(() => {
        this.onReset();
        this.chart.destroy()
        this.chart = null
      }, 1000)
    },
    onReset() {
      this.countries = {}

      let points = this.chart.series[1].points
      for (let i = 0; i < points.length; i++) {
        points[i].update({
          z: null
        })
      }
    },
    onUpdate(data) {
      for (let code in data.countries) {
        if (data.countries.hasOwnProperty(code)) {
          if (
            this.countries[code] &&
            this.countries[code].count == data.countries[code].count
          ) {
            continue;
          }

          let index = this.chart.series[1].points.findIndex(element => {
            return element.code === code
          })

          if (index >= 0) {
            let point = this.chart.series[1].points[index]
            point.update({
              z: data.countries[code].count
            })
          }
        }
      }

      this.countries = data.countries
    },
    initChart() {
      const chart = Highcharts.mapChart(this.$el, {
        chart: {
          borderWidth: 0,
          map: 'custom/world'
        },

        credits: {
          enabled: false
        },

        title: {
          text: ''
        },

        legend: {
          enabled: false
        },

        mapNavigation: {
          enabled: true,
          enableMouseWheelZoom: false,
          buttonOptions: {
            verticalAlign: 'bottom'
          }
        },

        series: [{
          name: 'Countries',
          color: '#E0E0E0',
          enableMouseTracking: false
        }, {
          type: 'mapbubble',
          name: 'Tweets',
          joinBy: ['iso-a2', 'code'],
          data: countries,
          minSize: 4,
          maxSize: '10%',
          tooltip: {
            pointFormat: '{point.code}: <b>{point.z}</b> tweets'
          }
        }]
      })

      return chart
    }
  }
}
</script>

<template>
<div>
</div>
</template>
