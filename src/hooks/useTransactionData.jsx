import { useEffect, useRef, useState } from 'react'
import { getTransactionData } from '../services/transaction.service'
import { useSelector } from 'react-redux'

const useTransactionData = () => {
  const [transaction, setTransaction] = useState(false)
  const transactionChanges = useSelector((state) => state.transactionChanges.data)
  const ref = useRef(false)
  useEffect(() => {
    if (!ref.current || transactionChanges) {
      try {
        getTransactionData().then((res) => {
          const result = [...res.data.result]
          result.reverse()
          setTransaction(result)
        })
      } catch (error) {
        if (!error.response) {
          console.error('Error: No Server Response! :(')
        } else if (error?.response?.data?.message) {
          console.error('Error: ', error?.response?.data?.message)
        } else {
          console.error('Error: ', error.message)
        }
      }
      return () => (ref.current = true)
    }
  }, [transactionChanges])
  return transaction
}

export default useTransactionData
