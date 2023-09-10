import { useEffect, useState } from 'react'
import { useResolvedPath } from 'react-router-dom'

const usePathName = () => {
  const [pathName, setPathName] = useState(false)
  const path = useResolvedPath()
  useEffect(() => {
    const urlPath = path.pathname.split('/')
    if (urlPath.length - 1 <= 2) return
    return setPathName(urlPath.splice(1, urlPath.length - 1))
    // const path1 = (urlPath[1 + 1].charAt(0).toUpperCase() + urlPath[1 + 1].slice(1))

    // if (urlPath[1 + 2]) {
    //     const path2 = (urlPath[1 + 2].charAt(0).toUpperCase() + urlPath[1 + 2].slice(1))
    // }
    // setPathName([path1, 'Default'])
  }, [path])
  return pathName
}

export default usePathName
