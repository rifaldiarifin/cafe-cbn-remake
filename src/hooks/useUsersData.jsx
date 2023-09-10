import { useEffect, useRef, useState } from 'react'
import usersData from '../services/usersData'

const useUsersData = () => {
  const [users, setUsers] = useState(false)
  const ref = useRef(false)
  useEffect(() => {
    if (!ref.current) {
      usersData((res) => setUsers(res))
    }
  }, [])
  return users
}

export default useUsersData
