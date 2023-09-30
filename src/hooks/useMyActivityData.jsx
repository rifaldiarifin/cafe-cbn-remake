import { useEffect, useRef, useState } from 'react'
import { readMyActivity } from '../utils/activity'
import { useSelector } from 'react-redux'

const useMyActivityData = () => {
  const [myActivity, setMyActivity] = useState(false)
  const acticityChanges = useSelector((state) => state.activityChanges.data)
  const ref = useRef(false)

  useEffect(() => {
    if (!ref.current || acticityChanges) {
      readMyActivity().then((res) => {
        const collect = [...res]
        collect.reverse()
        setMyActivity(collect)
      })
      return () => (ref.current = true)
    }
  }, [acticityChanges])
  return myActivity
}

export default useMyActivityData
