import { useEffect, useState } from 'react'
import { getTransactionToday } from '../services/transaction.service'
import { useSelector } from 'react-redux'

const useTransactionToday = () => {
  const [transaction, setTransaction] = useState(false)
  const transactionChanges = useSelector((state) => state.transactionChanges.data)
  useEffect(() => {
    // if (transactionChanges) {
    const collectTransaction = async () => {
      console.log('called')
      try {
        const result = await getTransactionToday()
        const recollect = [...result.data.result]
        const newCollect = {
          pending: [],
          cooking: [],
          complete: []
        }
        recollect.map((order) => {
          if (order.orderStatus.toLowerCase() === 'cooking') return newCollect.cooking.push(order)
          if (order.orderStatus.toLowerCase() === 'complete') return newCollect.complete.push(order)
          newCollect.pending.push(order)
        })
        setTransaction({
          pending: newCollect.pending,
          cooking: newCollect.cooking.reverse(),
          complete: newCollect.complete.reverse()
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
    }
    collectTransaction()
    const interval = setInterval(async () => {
      await collectTransaction()
    }, 3400)
    return () => clearInterval(interval)
    // }
  }, [transactionChanges])
  return transaction
}

export default useTransactionToday
