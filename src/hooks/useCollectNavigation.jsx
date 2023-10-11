import { useEffect, useRef, useState } from 'react'

const useCollectNavigation = (navGroup) => {
  const [navigation, setNavigation] = useState(false)
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
      setNavigation(collectNavMenu())
      return () => (ref.current = true)
    }
  }, [navGroup, navigation])
  return { navigation, setNavigation }
}

export default useCollectNavigation
