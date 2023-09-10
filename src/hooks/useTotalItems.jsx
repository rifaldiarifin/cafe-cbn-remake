import { useEffect, useState } from 'react'

const useTotalItems = (cartData) => {
  const [totalItems, setTotalItems] = useState({ qty: NaN, price: NaN })

  useEffect(() => {
    const getTotalItems = () => {
      if (!cartData) return
      return cartData.reduce((total, curr) => {
        return total + curr.price * curr.qty
      }, 0)
    }
    const getTotalQty = () => {
      if (!cartData) return
      return cartData.reduce((total, curr) => {
        return total + curr.qty
      }, 0)
    }
    setTotalItems({
      qty: getTotalQty(),
      price: getTotalItems()
    })
    return
  }, [cartData])
  return totalItems
}

export default useTotalItems
