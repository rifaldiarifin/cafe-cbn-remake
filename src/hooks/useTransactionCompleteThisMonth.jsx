import { useEffect, useRef, useState } from 'react'
import { getTransactionCompleteThisMonth } from '../services/transaction.service'

const useTransactionCompleteThisMonth = () => {
  const [transactionThisMonth, setTransactionThisMonth] = useState(false)
  const ref = useRef(false)
  useEffect(() => {
    if (!ref.current) {
      const collectTransaction = async () => {
        try {
          const result = await getTransactionCompleteThisMonth()
          const recollect = [...result.data.result]
          recollect.reverse()
          setTransactionThisMonth(recollect)
        } catch (error) {
          if (!error.response) {
            console.error('Error: No Server Response! :(')
          } else if (error?.response?.data?.message) {
            console.error('Error: ', error?.response?.data?.message)
          } else {
            console.error('Error: ', error.message)
          }
        }
      }
      collectTransaction()
      return () => (ref.current = true)
    }
  }, [])
  return transactionThisMonth
}

export default useTransactionCompleteThisMonth
