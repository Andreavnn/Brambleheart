import { createRouter, createWebHistory } from 'vue-router'
import SplashView from './views/SplashView.vue'
import HomeView from './views/HomeView.vue'
import RulesView from './views/RulesView.vue'
import SimulatorView from './views/SimulatorView.vue'
import SettingsView from './views/SettingsView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path:'/', name:'splash', component:SplashView },
    { path:'/characters', name:'characters', component:HomeView },
    { path:'/rules', name:'rules', component:RulesView },
    { path:'/simulator', name:'simulator', component:SimulatorView },
    { path:'/settings', name:'settings', component:SettingsView },
    { path:'/:pathMatch(.*)*', redirect:'/' },
  ],
  scrollBehavior: () => ({ top:0 }),
})
