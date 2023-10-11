import { useEffect } from 'react'
import { useState } from 'react'
import { useResolvedPath } from 'react-router-dom'

const usePathHash = () => {
  const [pathHash, setPathHash] = useState('')
  const resolvePath = useResolvedPath()
  const checkHash = window.location.hash
  useEffect(() => {
    setPathHash(window.location.hash)
  }, [resolvePath, checkHash])
  return pathHash
}

export default usePathHash
