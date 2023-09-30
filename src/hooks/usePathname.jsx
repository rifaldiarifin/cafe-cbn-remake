import { useEffect, useState } from 'react'
import { useResolvedPath } from 'react-router-dom'

const usePathName = () => {
  const [pathName, setPathName] = useState(false)
  const path = useResolvedPath()
  useEffect(() => {
    const urlPath = path.pathname.split('/')
    if (urlPath.length - 1 <= 2) return
    return setPathName(urlPath.splice(1, urlPath.length - 1))
  }, [path])
  return pathName
}

export default usePathName
