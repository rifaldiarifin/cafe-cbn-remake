import { useEffect } from 'react'

const useStickyHeader = (refElement) => {
  useEffect(() => {
    if (refElement) {
      const handleScroll = () => {
        if (window.scrollY > refElement.current.clientHeight / 2) {
          refElement.current.classList.add('sticky-active')
        } else {
          refElement.current.classList.remove('sticky-active')
        }
        return
      }

      document.addEventListener('scroll', handleScroll)
      return () => document.removeEventListener('scroll', handleScroll)
    }
  }, [refElement])
}

export default useStickyHeader
