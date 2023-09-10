import { useEffect, useState } from 'react'

const useSlideChange = (data) => {
  const { count, startIndex = 0, reverse = false, delay = 4000 } = data
  if (typeof count !== 'number') throw new Error('count must be boolean')
  if (typeof startIndex !== 'number') throw new Error('startIndex must be boolean')
  if (typeof reverse !== 'boolean') throw new Error('reverse must be boolean')
  if (typeof delay !== 'number') throw new Error('delay must be boolean')

  const [banner, setBanner] = useState({
    index: startIndex,
    dot: []
  })

  useEffect(() => {
    const collectDot = (num) => {
      let dot = []
      for (let x = 0; x <= num; x++) {
        dot.push(false)
      }
      dot[banner.index] = true
      return dot
    }

    const setDotActive = (index) => {
      let newDot = [...banner.dot]
      for (let x = 0; x < newDot.length; x++) {
        newDot[x] = false
      }
      newDot[index] = true
      return newDot
    }

    if (banner.dot.length === 0) setBanner({ index: startIndex, dot: collectDot(count) })
    const id = setInterval(() => {
      if (reverse) {
        banner.index === 0
          ? setBanner({ index: count, dot: setDotActive(count) })
          : setBanner({ index: banner.index - 1, dot: setDotActive(banner.index - 1) })
        return
      }
      banner.index >= count
        ? setBanner({ index: 0, dot: setDotActive(0) })
        : setBanner({ index: banner.index + 1, dot: setDotActive(banner.index + 1) })
    }, delay)
    return () => clearInterval(id)
  }, [count, banner, reverse, delay, startIndex])
  return banner
}

export default useSlideChange
