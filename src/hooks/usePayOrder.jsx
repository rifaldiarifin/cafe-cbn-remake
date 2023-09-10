import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const usePayOrder = () => {
  const ref = useRef(false)
  const alertAction = useSelector((state) => state.popupScreen.data.alertData)

  useEffect(() => {
    if (alertAction.actionName === 'payOrder' && ref.current === true) {
      if (alertAction.action.yes) console.log('YES')
      if (alertAction.action.no) console.log('NO')
      if (alertAction.action.ok) console.log('OK')
    }
    return () => (ref.current = true)
  }, [alertAction.action])
}

export default usePayOrder
