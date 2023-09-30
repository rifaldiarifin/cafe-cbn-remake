import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getMenuDataOnlyUuid } from '../services/menu.service'

const useGroupingMenu = (data) => {
  const [group, setGroup] = useState(false)
  const groupChanges = useSelector((state) => state.groupChanges.data)
  const ref = useRef(false)
  useEffect(() => {
    if ((!ref.current && data) || (data && groupChanges)) {
      setGroup(false)
      const recollect = (dataGroups) => {
        const collectGroup = [...dataGroups]
        for (let x = 0; x < dataGroups.length; x++) {
          const group = dataGroups[x]

          const collectMenus = group.menus.reduce((prev, curr) => {
            const newMenu = data.find((find) => find.uuid === curr.uuid)
            if (!newMenu) return
            return (prev = [...prev, newMenu])
          }, [])

          collectGroup[x].menus = collectMenus
        }
        return collectGroup
      }
      try {
        getMenuDataOnlyUuid().then((response) => {
          setGroup(recollect(response.data.result))
        })
      } catch (error) {
        if (!error.response) {
          console.error('Error: No Server Response! :(')
        } else if (error.response?.data?.message) {
          console.error('Error: ', error.response?.data?.message)
        } else {
          console.error('Error: ', error.message)
        }
      }
      return () => (ref.current = true)
    }
  }, [data, group.menus, groupChanges])
  return group
}

export default useGroupingMenu
