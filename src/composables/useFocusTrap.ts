import { nextTick, onBeforeUnmount, watch, type Ref } from 'vue'

const FOCUSABLE='a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

export function useFocusTrap(open:Ref<boolean>,container:Ref<HTMLElement|null>,close:()=>void){
  let previous:HTMLElement|null=null
  let listening=false

  function focusable(){
    const root=container.value
    if(!root)return[] as HTMLElement[]
    return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(element=>!element.hasAttribute('disabled')&&element.getAttribute('aria-hidden')!=='true')
  }
  function onKeydown(event:KeyboardEvent){
    if(!open.value)return
    if(event.key==='Escape'){
      event.preventDefault()
      close()
      return
    }
    if(event.key!=='Tab')return
    const items=focusable()
    if(!items.length){event.preventDefault();container.value?.focus();return}
    const first=items[0],last=items[items.length-1]
    const active=document.activeElement
    if(event.shiftKey&&(active===first||!container.value?.contains(active))){event.preventDefault();last.focus()}
    else if(!event.shiftKey&&active===last){event.preventDefault();first.focus()}
  }
  function start(){
    if(listening||typeof document==='undefined')return
    document.addEventListener('keydown',onKeydown,true)
    listening=true
  }
  function stop(){
    if(!listening||typeof document==='undefined')return
    document.removeEventListener('keydown',onKeydown,true)
    listening=false
  }
  watch(open,async(value)=>{
    if(value){
      previous=typeof document!=='undefined'&&document.activeElement instanceof HTMLElement?document.activeElement:null
      await nextTick()
      const root=container.value
      if(!root)return
      if(!root.hasAttribute('tabindex'))root.setAttribute('tabindex','-1')
      start()
      ;(focusable()[0]||root).focus()
    }else{
      stop()
      await nextTick()
      if(previous?.isConnected)previous.focus()
      previous=null
    }
  },{flush:'post',immediate:true})
  onBeforeUnmount(stop)
}
