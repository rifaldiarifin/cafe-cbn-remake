import { useEffect, useRef, useState } from 'react'
import { menuData } from '../services/menuData'

const useMenuData = () => {
  const [menu, setMenu] = useState(false)
  const ref = useRef(false)
  useEffect(() => {
    if (!ref.current) {
      menuData.then((res) => setMenu(res))
      return () => (ref.current = true)
    }
  }, [menu])
  return menu
}

export default useMenuData
