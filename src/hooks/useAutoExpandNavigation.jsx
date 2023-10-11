import { useEffect, useRef } from 'react'

const useAutoExpandNavigation = ({ pathName, setAside, setNav }) => {
  const ref = useRef(false)
  useEffect(() => {
    if (!ref.current || pathName) {
      if (pathName[1] && pathName[1] !== 'dashboard') return setAside(false)
      setAside(true)
      return () => (ref.current = true)
    }
  }, [pathName])

  useEffect(() => {
    const handleResizeWindow = () => {
      if (window.screen.width > 768) return setNav(true)
      setNav(false)
    }
    window.addEventListener('resize', handleResizeWindow)
    return () => window.removeEventListener('resize', handleResizeWindow)
  }, [])
}

export default useAutoExpandNavigation
