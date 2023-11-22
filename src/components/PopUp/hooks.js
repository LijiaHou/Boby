import React, {useState, useEffect, useRef} from 'react'

export function useMount({active = false, ref, delay = 300}) {
  const [isShow, setIsShow] = useState(false)
  const [didMount, setDidMount] = useState(false)
  const timeout = useRef(null)

  useEffect(
    () => {
      if (active) {
        clearTimeout(timeout.current)
        setDidMount(active)
      } else {
        setIsShow(active)
        timeout.current = setTimeout(() => {
          setDidMount(active)
        }, delay)
      }
    },
    [active]
  )

  useEffect(
    () => {
      if (ref.current) {
        reflow(ref.current)
      }
      setIsShow(didMount)
    },
    [didMount]
  )

  return {
    didMount,
    isShow,
  }
}

/**
 * Returns a string with at least 64-bits of randomness.
 *
 * Doesn't trust Javascript's random function entirely. Uses a combination of
 * random and current timestamp, and then encodes the string in base-36 to
 * make it shorter.
 *
 * From: https://medium.com/este-js-framework/its-ok-to-use-javascript-generated-guid-in-a-browser-373ca6431cf7
 * Code: https://github.com/google/closure-library/blob/555e0138c83ed54d25a3e1cd82a7e789e88335a7/closure/goog/string/string.js#L1177
 *
 * @return {string} A random string, e.g. sn1s7vb4gcic.
 */
export function getRandomString() {
  const x = 2147483648
  return (
    Math.floor(Math.random() * x).toString(36) +
    // eslint-disable-next-line no-bitwise
    Math.abs(Math.floor(Math.random() * x) ^ Date.now()).toString(36)
  )
}

// return element offset height to force the reflow
export function reflow(el) {
  return el.offsetHeight
}
