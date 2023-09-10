import { useEffect, useState } from 'react'
import transactionData from '../services/transactionData'

const useTransactionData = () => {
  const [transaction, setTransaction] = useState(false)
  useEffect(() => {
    transactionData.then((res) => {
      setTransaction(res)
    })
  }, [])
  return transaction
}

export default useTransactionData
