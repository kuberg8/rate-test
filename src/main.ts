import './assets/main.css'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

const vuetify = createVuetify({
  components,
  directives,
})

app.use(vuetify)

app.mount('#app')
