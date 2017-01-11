import 'core-js/fn/array/find-index'
import 'core-js/fn/object/keys'
import 'core-js/fn/object/assign'

import Highcharts from 'highcharts'
import HighchartsMore from 'highcharts-more'
import SolidGaugeChart from 'highcharts/modules/solid-gauge'
import Highmaps from 'highcharts/modules/map'

HighchartsMore(Highcharts)
SolidGaugeChart(Highcharts)
Highmaps(Highcharts)

window.scrollTo(0, 0)
