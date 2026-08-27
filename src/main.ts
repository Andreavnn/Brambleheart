import './data/beta032Content'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupInstallSupport } from './state/install'
import './styles.css'
import './styles.beta032.css'

setupInstallSupport()
createApp(App).use(router).mount('#app')
