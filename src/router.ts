import { createRouter, createWebHistory } from 'vue-router'
import SplashView from './views/SplashView.vue'
import HomeView from './views/HomeView.vue'
import RulesView from './views/RulesView.vue'
import SimulatorView from './views/SimulatorView.vue'
import SettingsView from './views/SettingsView.vue'
import ChangelogView from './views/ChangelogView.vue'
import { hasSeenWelcome } from './services/welcome'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top:0 }),
  routes: [
    { path:'/', redirect:'/characters' },
    { path:'/welcome', name:'welcome', component:SplashView },
    { path:'/characters', name:'characters', component:HomeView },
    { path:'/rules', name:'rules', component:RulesView },
    { path:'/simulator', name:'simulator', component:SimulatorView },
    { path:'/settings', name:'settings', component:SettingsView },
    { path:'/changelog', name:'changelog', component:ChangelogView },
    { path:'/:pathMatch(.*)*', redirect:'/characters' },
  ],
})

router.beforeEach((to) => {
  if (to.name === 'welcome' || hasSeenWelcome()) return true
  return { name:'welcome', query:{ continue:to.fullPath } }
})

export default router
