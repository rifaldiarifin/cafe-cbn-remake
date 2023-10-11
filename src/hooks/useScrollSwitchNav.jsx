import { useEffect } from 'react'

const useScrollSwitchNav = (clientTopRefs = [], setStateNav) => {
  useEffect(() => {
    const switchNav = (switchIndex) => {
      if (!switchIndex && typeof switchIndex !== 'number') return console.error('You not set switchIndex argument yet.')
      setStateNav((prevState) => {
        return prevState.reduce((prev, curr, reduceIndex) => {
          if (switchIndex === reduceIndex) return (prev = [...prev, true])
          return (prev = [...prev, false])
        }, [])
      })
    }
    const handleSetStateNav = () => {
      clientTopRefs.map((clientTopRef, index) => {
        const element = clientTopRef.current,
          windowHeight = window.innerHeight,
          revealTop = element.getBoundingClientRect().top,
          revealPoint = 100
        if (revealTop < windowHeight - revealPoint) {
          switchNav(index)
        }
      })
    }
    document.addEventListener('scroll', handleSetStateNav)
    return () => document.removeEventListener('scroll', handleSetStateNav)
  }, [clientTopRefs])
}

export default useScrollSwitchNav
