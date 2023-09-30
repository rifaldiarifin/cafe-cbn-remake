import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useRestartOrderTimer = (callbackRestart = async () => {}) => {
  const navigate = useNavigate()
  const [restartOrder, setRestartOrder] = useState({ status: false, count: 15 })
  const restart = async () => {
    await callbackRestart()
    navigate('/machine', { replace: true })
  }
  const restartCountdown = () => {
    setRestartOrder({ ...restartOrder, status: true })
  }
  useEffect(() => {
    if (!restartOrder.status) return
    const interval = setInterval(async () => {
      setRestartOrder({ ...restartOrder, count: restartOrder.count - 1 })
      if (restartOrder.count !== 0) return
      clearInterval(interval)
      await restart()
    }, 1000)
    return () => clearInterval(interval)
  }, [restartOrder])
  return { restartOrder, restart, restartCountdown }
}

export default useRestartOrderTimer
