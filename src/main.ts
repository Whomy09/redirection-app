import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueGoodTablePlugin from 'vue-good-table-next'

import { configAcl } from '@/acl'
import router from './router'

import '@/assets/index.css'
import '@/assets/custom_vue_good_table.css'
import 'vue-good-table-next/dist/vue-good-table-next.css'

const app = createApp(App)
app.use(createPinia())
app.use(VueGoodTablePlugin)
app.use(router)

const acl = configAcl()
app.use(acl)

app.mount('#app')
