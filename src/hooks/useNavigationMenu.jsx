import { useEffect, useRef, useState } from 'react'

const useNavigationMenu = (navGroup, addFiltering = false) => {
  const [navigationMenu, setNavigationMenu] = useState(false)
  const ref = useRef(false)
  useEffect(() => {
    if (!ref.current && navGroup) {
      const collectNavMenu = () => {
        const collectData = []
        navGroup.map((group) => {
          if (!group?.showOn) return
          collectData.push(false)
        })
        collectData[0] = true
        return collectData
      }
      setNavigationMenu(collectNavMenu())
      return () => (ref.current = true)
    }
  }, [addFiltering, navGroup, navigationMenu])
  return { navigationMenu, setNavigationMenu }
}

export default useNavigationMenu
