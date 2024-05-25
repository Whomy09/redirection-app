import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'
import VueGoodTablePlugin from 'vue-good-table-next'

import '@/assets/index.css'
import '@/assets/custom_vue_good_table.css'
import 'vue-good-table-next/dist/vue-good-table-next.css'

const app = createApp(App)

app.use(createPinia())
app.use(VueGoodTablePlugin)
app.use(router)
app.use(VueApexCharts)
app.component('apexchart', VueApexCharts)

app.mount('#app')
