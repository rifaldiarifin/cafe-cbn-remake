import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getMenuData } from '../services/menu.service'

const useMenuData = () => {
  const [menuData, setMenuData] = useState(false)
  const menuChanges = useSelector((state) => state.menuChanges.data)
  const ref = useRef(false)
  useEffect(() => {
    if (!ref.current || menuChanges) {
      setMenuData(false)
      const sortingMode = ({ sort = 'name', mode = 'down', data }) => {
        switch (sort) {
          case 'name':
            if (mode === 'down') {
              data.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                  return -1
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                  return 1
                }
                return 0
              })
            } else {
              data.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                  return 1
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                  return -1
                }
                return 0
              })
            }
            break

          default:
            break
        }
      }

      const newCollectMenu = async () => {
        try {
          const response = await getMenuData()
          sortingMode({ data: response.data.result })
          setMenuData(response.data.result)
        } catch (error) {
          console.error(error.message)
        }
      }
      newCollectMenu()
    }
    return () => (ref.current = true)
  }, [menuChanges])
  return menuData
}

export default useMenuData
