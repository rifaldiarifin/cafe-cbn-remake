import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const useSignOut = () => {
  const ref = useRef(false)
  const alertAction = useSelector((state) => state.popupScreen.data.alertData)

  useEffect(() => {
    if (alertAction.actionName === 'signOut' && ref.current === true) {
      if (alertAction.action.yes) {
        window.location.href = '/'
      }
    }
    return () => (ref.current = true)
  }, [alertAction.action])
}

export default useSignOut
