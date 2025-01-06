import { decodeHtmlEntities } from 'aptechka/utils'
import { PopoverElement } from 'aptechka/popover'

export class FormPopoverElement extends PopoverElement {
  constructor() {
    super()

    this.addEventListener('popoverTriggered', (e) => {
      const trigger = e.detail.trigger

      const tryUpdateInputs = (value?: string | undefined | null) => {
        const inputs = value?.split(';').map((v) => {
          const splitted = v.split(':').map((v) => v.trim())
          return {
            name: splitted[0],
            value: splitted[1],
          }
        })

        inputs?.forEach((input) => {
          const inputElement = this.querySelector<any>(`[name="${input.name}"]`)

          if (inputElement) {
            inputElement.value = decodeHtmlEntities(input.value || '')
          }
        })
      }

      if (trigger instanceof HTMLElement) {
        tryUpdateInputs(trigger.getAttribute('data-fill-inputs'))
      } else if (typeof trigger === 'string') {
        tryUpdateInputs(trigger)
      }
    })
  }
}

if (!customElements.get('e-form-popover')) {
  customElements.define('e-form-popover', FormPopoverElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-form-popover': FormPopoverElement
  }
}
