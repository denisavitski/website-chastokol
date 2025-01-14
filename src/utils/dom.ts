export function isVisible(element: HTMLElement) {
  return (
    element.clientWidth !== 0 &&
    element.clientHeight !== 0 &&
    (element.style.opacity !== ''
      ? parseFloat(element.style.opacity) > 0
      : true)
  )
}
