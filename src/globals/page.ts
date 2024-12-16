export let scrollElement = { current: document.querySelector('#page-scroll') }

function updateSize() {
  const clientWidth = document.documentElement.clientWidth

  document.documentElement.style.setProperty(
    '--inner-height',
    innerHeight + 'px',
  )

  document.documentElement.style.setProperty(
    '--client-width',
    clientWidth + 'px',
  )
}

function scrollListener() {
  document.documentElement.classList.toggle(
    'page-scrolled',
    !!scrollElement.current?.scrollTop,
  )
}

function updateScroll() {
  scrollElement.current?.removeEventListener('scroll', scrollListener)
  scrollElement.current = document.querySelector('#page-scroll')
  scrollElement.current?.addEventListener('scroll', scrollListener)
  scrollListener()
}

addEventListener('load', () => {
  document.documentElement.classList.add('page-loaded')
  updateSize()
  updateScroll()
})

addEventListener('resize', updateSize)
