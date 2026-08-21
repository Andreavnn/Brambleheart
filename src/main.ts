import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupInstallSupport } from './state/install'
import './styles.css'

setupInstallSupport()
createApp(App).use(router).mount('#app')
