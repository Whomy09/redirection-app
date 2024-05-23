<script lang="ts" setup>
import { computed, ref } from 'vue'

const series = ref([
  {
    name: 'Link 1',
    data: [31, 40, 28, 51, 42, 109, 100]
  },
  {
    name: 'Link 2',
    data: [11, 32, 45, 32, 34, 52, 41]
  }
])

const chartOptions = computed(() => ({
  chart: {
    height: 350,
    type: 'area'
  },
  title: {
    text: 'Grafica en tiempo real del movimiento de los usuarios',
    align: 'left'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    type: 'datetime',
    categories: [
      '2018-09-19T00:00:00.000Z',
      '2018-09-19T01:30:00.000Z',
      '2018-09-19T02:30:00.000Z',
      '2018-09-19T03:30:00.000Z',
      '2018-09-19T04:30:00.000Z',
      '2018-09-19T05:30:00.000Z',
      '2018-09-19T06:30:00.000Z'
    ]
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm'
    }
  }
}))
</script>

<template>
  <div>
    <apexchart type="area" height="350" :options="chartOptions" :series="series" />
  </div>
</template>
