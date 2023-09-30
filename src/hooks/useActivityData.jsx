import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { readAllActivity } from '../utils/activity'

const useActivityData = () => {
  const [activity, setActivity] = useState(false)
  const acticityChanges = useSelector((state) => state.activityChanges.data)
  const ref = useRef(false)

  useEffect(() => {
    if (!ref.current || acticityChanges) {
      readAllActivity().then((res) => {
        const collect = [...res]
        collect.reverse()
        setActivity(collect)
      })
      return () => (ref.current = true)
    }
  }, [acticityChanges])
  return activity
}

export default useActivityData
