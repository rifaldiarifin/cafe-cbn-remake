import { useEffect, useRef } from 'react'

const useAutoExpandNavigation = ({ pathName, state, setState }) => {
  const ref = useRef(false)
  useEffect(() => {
    if (!ref.current || pathName) {
      if (pathName[1] && pathName[1] !== 'dashboard') return setState({ aside: false, nav: state.nav })
      setState({ aside: true, nav: state.nav })
      return () => (ref.current = true)
    }
  }, [pathName])
}

export default useAutoExpandNavigation
