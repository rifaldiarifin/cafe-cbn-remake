import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUsersData } from '../services/users.service'

const useUsersData = () => {
  const [users, setUsers] = useState(false)
  const userChanges = useSelector((state) => state.userChanges.data)
  const ref = useRef(false)
  useEffect(() => {
    if (!ref.current || userChanges) {
      try {
        getUsersData().then((res) => {
          setUsers(res.data.result)
        })
      } catch (error) {
        if (!error.response) {
          console.error('Error: No Server Response! :(')
        } else if (error.response?.data?.message) {
          console.error('Error: ', error.response?.data?.message)
        } else {
          console.error('Error: ', error.message)
        }
      }
    }
    return () => (ref.current = true)
  }, [userChanges])
  return users
}

export default useUsersData
