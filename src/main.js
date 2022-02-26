import { createApp } from 'vue'
import filters from './helpers/filters'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.config.globalProperties.$filters = filters

app
  .use(store)
  .use(router)
  .mount('#app')
