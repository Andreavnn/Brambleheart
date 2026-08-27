import { createRouter, createWebHistory } from 'vue-router'
import SplashView from './views/SplashView.vue'
import HomeView from './views/HomeView.vue'
import CreateCharacterView from './views/CreateCharacterView.vue'
import LevelUpView from './views/LevelUpView.vue'
import RulesView from './views/RulesViewBeta032.vue'
import RuleReaderView from './views/RuleReaderView.vue'
import RuleLayoutPreviewView from './views/RuleLayoutTestView.vue'
import SimulatorView from './views/SimulatorView.vue'
import SettingsView from './views/SettingsViewBeta032.vue'
import ChangelogView from './views/ChangelogViewBeta032.vue'
import { hasSeenWelcome } from './services/welcome'

const router=createRouter({
  history:createWebHistory(),
  scrollBehavior:()=>({top:0}),
  routes:[
    {path:'/',redirect:'/characters'},
    {path:'/welcome',name:'welcome',component:SplashView},
    {path:'/characters',name:'characters',component:HomeView},
    {path:'/characters/create',name:'create-character',component:CreateCharacterView},
    {path:'/characters/:id/level-up',name:'level-up-character',component:LevelUpView},
    {path:'/rules',name:'rules',component:RulesView},
    {path:'/rules/read/:slug',name:'rule-reader',component:RuleReaderView},
    {path:'/rules/layout-preview/:slug?',name:'rule-layout-preview',component:RuleLayoutPreviewView},
    {path:'/simulator',name:'simulator',component:SimulatorView},
    {path:'/settings',name:'settings',component:SettingsView},
    {path:'/changelog',name:'changelog',component:ChangelogView},
    {path:'/:pathMatch(.*)*',redirect:'/characters'},
  ],
})
router.beforeEach(to=>{
  if(to.name==='welcome'||hasSeenWelcome())return true
  return{name:'welcome',query:{continue:to.fullPath}}
})
export default router
