export function debounce(func, wait, immediate) {
  let timeout

  return function(force) {
    let context = this
    let args = arguments

    let later = function() {
      timeout = null

      if (!immediate) {
        func.apply(context, args)
      }
    }

    let callNow = force || (immediate && !timeout)

    clearTimeout(timeout)

    if (callNow) {
      func.apply(context, args)
    } else {
      timeout = setTimeout(later, wait)
    }
  }
}

export function interval(func, wait) {
  let timeout

  return {
    start: function() {
      let context = this
      let args = arguments

      let later = function() {
        clearTimeout(timeout)
        func.apply(context, args)
        timeout = setTimeout(later, wait)
      }

      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    },
    stop: function() {
      clearTimeout(timeout)
    }
  }
}
