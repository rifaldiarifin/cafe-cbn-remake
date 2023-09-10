import { useEffect, useRef, useState } from 'react'
import groupingMenu from '../utils/groupingMenu'

const useGroupingMenu = (data) => {
  const [group, setGroup] = useState(false)
  const ref = useRef(false)
  useEffect(() => {
    if (!ref.current && data) {
      setGroup(groupingMenu(data))
      return () => (ref.current = true)
    }
  }, [data])
  return group
}

export default useGroupingMenu
