export const requestAnimationFrame: typeof window.requestAnimationFrame = window.requestAnimationFrame ?? function (callback) {
  return setTimeout(callback, 16)
}

export const cancelAnimationFrame: typeof window.cancelAnimationFrame = window.cancelAnimationFrame ?? function (id) {
  clearTimeout(id)
}
