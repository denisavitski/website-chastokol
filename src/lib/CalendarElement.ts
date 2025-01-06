import {
  capitalize,
  clamp,
  createStylesheet,
  dispatchEvent,
} from 'aptechka/utils'

const style = createStylesheet({
  ':host': {
    position: 'relative',
    boxSizing: 'border-box',
    display: 'inline-block',
    padding: '2rem',
    borderRadius: 'var(--border-radius)',
    backgroundColor: 'var(--color-grayscale-0)',
  },

  '.head': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: '2.8rem',
  },

  '.arrow': {
    flexShrink: '0',

    fontFamily: 'inherit',
    border: 'none',
    background: 'none',
    color: 'inherit',
    padding: '0',
    cursor: 'pointer',
    userSelect: 'none',

    width: '2rem',
    height: '2rem',
  },

  '.arrow svg': {
    width: '100%',
    height: '100%',
    fill: 'var(--color-primary-100)',
  },

  '.arrow-left': {
    transform: 'scaleX(-1)',
  },

  ':host(.current-month) .arrow-left': {
    opacity: 0.4,
    pointerEvents: 'none',
  },

  '.month-name': {
    fontSize: '1.6rem',
    fontWeight: '500',
  },

  '.days-names': {
    display: ' grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: 'var(--gap, 0rem 0.8rem)',
    color: 'var(--color-grayscale-400)',
  },

  '.days-list': {
    display: ' grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: 'var(--gap, 0rem 0.8rem)',
  },

  '.day': {
    fontSize: '1.6rem',
    fontWeight: '400',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: 'var(--day-size, 3.6rem)',
    height: 'var(--day-size, 3.6rem)',

    cursor: 'pointer',
    borderRadius: '50%',
  },

  '.day.picked': {
    backgroundColor: 'var(--color-primary-100)',
    color: 'var(--color-grayscale-0)',
  },

  '.day.inactive': {
    color: 'var(--color-grayscale-300)',
    pointerEvents: 'none',
  },

  '@media(max-width: 768px)': {
    ':host': {
      width: '100%',
    },

    '.head': {
      marginBottom: '2rem',
    },

    '.month-name': {
      fontSize: '1.4rem',
    },

    '.day': {
      fontSize: '1.2rem',
      width: 'var(--day-size, 3rem)',
      height: 'var(--day-size, 3rem)',
    },
  },
})

export interface CalendarPickedDate {
  day: number
  month: number
  year: number
}

export interface CalendarEvents {
  calendarPick: CustomEvent<CalendarPickedDate>
}

export class CalendarElement extends HTMLElement {
  #counter = 0
  #todayDate = new Date()
  #todayYear = this.#todayDate.getFullYear()
  #todayMonth = this.#todayDate.getMonth()

  #monthNameElement: HTMLElement
  #arrowLeftElement: HTMLElement
  #arrowRightElement: HTMLElement
  #daysListElement: HTMLElement

  #dayElements: Array<HTMLElement> = []

  #pickedDate: CalendarPickedDate = {
    day: 1,
    month: 1,
    year: 1,
  }

  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    shadow.adoptedStyleSheets = [...shadow.adoptedStyleSheets, style]

    shadow.innerHTML = `
      <div class="head">
        <button class="arrow arrow-left">
          <svg><use xlink:href="/sprite.svg#sprite:tailless-arrow"></svg>
        </button>
        <div class="month-name"></div>
        <button class="arrow arrow-right">
          <svg><use xlink:href="/sprite.svg#sprite:tailless-arrow"></svg>
        </button>
        </button>
      </div>
      <div class="days">
        <div class="days-names">
          <div class="day">Пн.</div>
          <div class="day">Вт.</div>
          <div class="day">Ср.</div>
          <div class="day">Чт.</div>
          <div class="day">Вт.</div>
          <div class="day">Сб.</div>
          <div class="day">Вс.</div>
        </div>
        <div class="days-list"></div>
      </div>
    `

    this.#monthNameElement = shadow.querySelector('.month-name')!
    this.#arrowLeftElement = shadow.querySelector('.arrow-left')!
    this.#arrowRightElement = shadow.querySelector('.arrow-right')!
    this.#daysListElement = shadow.querySelector('.days-list')!

    this.#counter = this.#todayMonth

    this.#arrowLeftElement.addEventListener('click', () => {
      this.shiftMonth(-1)
    })

    this.#arrowRightElement.addEventListener('click', () => {
      this.shiftMonth(1)
    })

    this.#createMonth()
  }

  public get pickedDate() {
    return this.#pickedDate
  }

  public setMonth(value: number) {
    this.#counter = clamp(value, this.#todayMonth, Infinity)

    this.#createMonth()
  }

  public shiftMonth(value: number) {
    this.setMonth(this.#counter + value)
  }

  #createMonth() {
    let monthIndex = this.#counter
    const year = this.#todayYear + Math.floor(monthIndex / 12)
    monthIndex = monthIndex % 12
    monthIndex = monthIndex < 0 ? 12 + monthIndex : monthIndex

    const date = new Date(year, monthIndex, 1)
    const monthName = date.toLocaleString('default', { month: 'long' })
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
    const offsetIndex = (date.getDay() + 6) % 7

    this.#monthNameElement.textContent = `${capitalize(monthName)} ${year}`

    const dayElements: Array<HTMLElement> = []

    let firstActiveDayNumber: number = 0

    for (let dayIndex = 0; dayIndex < daysInMonth + offsetIndex; dayIndex++) {
      const element = document.createElement('div')
      element.className = 'day'

      if (dayIndex >= offsetIndex) {
        const dayNumber = dayIndex - offsetIndex + 1
        const dayString = dayNumber.toString()

        const date = new Date(year, monthIndex, dayNumber + 1)

        if (date.getTime() < this.#todayDate.getTime()) {
          element.classList.add('inactive')
        } else if (!firstActiveDayNumber) {
          firstActiveDayNumber = dayNumber
        }

        element.textContent = dayString

        element.setAttribute('data-value', dayString)
      }

      dayElements.push(element)
    }

    this.#daysListElement.innerHTML = ''
    this.#daysListElement.append(...dayElements)

    this.#dayElements.forEach((element) => {
      element.removeEventListener('click', this.#dayClickListener)
    })

    this.#dayElements = dayElements

    this.#dayElements.forEach((element) => {
      element.addEventListener('click', this.#dayClickListener)
    })

    this.classList.toggle('current-month', this.#counter === this.#todayMonth)

    this.#pickedDate.month = date.getMonth() + 1
    this.#pickedDate.year = date.getFullYear()
    this.#pickDay(firstActiveDayNumber)
  }

  #dayClickListener = (e: Event) => {
    const ct = e.currentTarget as HTMLElement
    this.#pickDay(parseInt(ct.getAttribute('data-value')!))
  }

  #pickDay(number: number) {
    this.#pickedDate.day = number

    this.#dayElements.forEach((element) => {
      if (element.getAttribute('data-value') === number.toString()) {
        element.classList.add('picked')
      } else {
        element.classList.remove('picked')
      }
    })

    dispatchEvent(this, 'calendarPick', {
      detail: this.#pickedDate,
      composed: true,
      bubbles: true,
    })
  }
}

if (!customElements.get('e-calendar')) {
  customElements.define('e-calendar', CalendarElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'e-calendar': CalendarElement
  }

  interface HTMLElementEventMap extends CalendarEvents {}
}
