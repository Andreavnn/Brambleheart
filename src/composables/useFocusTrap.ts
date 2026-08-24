import { nextTick, onBeforeUnmount, watch, type Ref } from 'vue'

const FOCUSABLE_SELECTOR = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

function focusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(el => el.offsetParent !== null)
}

export function useFocusTrap(container: Ref<HTMLElement | null>, isOpen: Ref<boolean>, onClose: () => void) {
  let previouslyFocused: HTMLElement | null = null

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') { event.preventDefault(); onClose(); return }
    if (event.key !== 'Tab' || !container.value) return
    const items = focusableElements(container.value)
    if (!items.length) return
    const first = items[0], last = items[items.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
  }

  watch(isOpen, async open => {
    if (open) {
      previouslyFocused = document.activeElement as HTMLElement | null
      await nextTick()
      const items = container.value ? focusableElements(container.value) : []
      ;(items[0] || container.value)?.focus()
      container.value?.addEventListener('keydown', handleKeydown)
    } else {
      container.value?.removeEventListener('keydown', handleKeydown)
      previouslyFocused?.focus()
      previouslyFocused = null
    }
  })

  onBeforeUnmount(() => { container.value?.removeEventListener('keydown', handleKeydown) })
}
