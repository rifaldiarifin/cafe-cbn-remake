import { useEffect, useRef, useState } from 'react'
import { getDate } from '../utils/date'
import customCalendar from '../utils/customCalendar'

const useOverviewData = ({ menuData, menuGroup, transactionData }) => {
  const ref1 = useRef(false)
  const ref2 = useRef(false)
  const ref3 = useRef(false)
  const ref4 = useRef(false)
  const [staticOverview, setStaticOverview] = useState({
    totalOrder: 0,
    totalMenu: 0,
    totalGroup: 0,
    totalSale: 0
  })
  const [totalSaleCurrentYear, setTotalSaleCurrentYear] = useState([
    { Jan: 0 },
    { Feb: 0 },
    { Mar: 0 },
    { Apr: 0 },
    { May: 0 },
    { Jun: 0 },
    { Jul: 0 },
    { Aug: 0 },
    { Sep: 0 },
    { Oct: 0 },
    { Nov: 0 },
    { Dec: 0 }
  ])
  const [totalOrderPerWeek, setTotalOrderPerWeek] = useState([
    { Sun: 0 },
    { Mon: 0 },
    { Tue: 0 },
    { Wed: 0 },
    { Thu: 0 },
    { Fri: 0 },
    { Sat: 0 }
  ])
  const [totalMostOrderingGroup, setTotalMostOrderingGroup] = useState([])
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  useEffect(() => {
    if (!ref1.current && menuData && menuGroup && transactionData) {
      const totalOrder = transactionData.length
      const totalMenu = menuData.length
      const totalGroup = menuGroup.length
      const totalSale = transactionData.reduce((prev, curr) => {
        return (prev = prev + curr.bill)
      }, 0)
      setStaticOverview({
        totalOrder,
        totalMenu,
        totalGroup,
        totalSale
      })
      return () => (ref1.current = true)
    }
  }, [menuData, menuGroup, transactionData])

  useEffect(() => {
    if (!ref2.current && menuData && menuGroup && transactionData) {
      const getSaleByYear = (year) => {
        // collect data by "year"
        const currentYearData = []
        for (let z = 0; z < transactionData.length; z++) {
          if (
            getDate(transactionData[z].createdAt).includes(year.toString()) &&
            transactionData[z].orderStatus.toLowerCase() === 'complete'
          )
            currentYearData.push(transactionData[z])
        }

        // collect data per month
        const collectTransactionPerMonth = months.reduce((prev, curr) => (prev = [...prev, { [curr]: [] }]), [])
        currentYearData.map((transaction) => {
          const monthIndex = parseInt(getDate(transaction.createdAt).split('-')[1]) - 1
          collectTransactionPerMonth[monthIndex][months[monthIndex]].push(transaction.bill)
        })

        // calculate the total price of each month
        collectTransactionPerMonth.map((transaction, index) => {
          const calculateTotal = transaction[months[index]].reduce((prev, curr) => (prev = prev + curr), 0)
          transaction[months[index]] = calculateTotal
        })
        return collectTransactionPerMonth
      }

      setTotalSaleCurrentYear(getSaleByYear(new Date().getFullYear()))
      return () => (ref2.current = true)
    }
  }, [menuData, menuGroup, transactionData])

  useEffect(() => {
    if (!ref3.current && transactionData) {
      const getOrderPerWeek = () => {
        // collect days
        const calendar = customCalendar().getFullDateCurrentWeek()
        const collectOrderPerWeek = []
        days.map((day) => {
          collectOrderPerWeek.push({ [day]: 0 })
        })

        // collect data order per week
        transactionData.map((transaction) => {
          const date = getDate(transaction.createdAt)
          for (let i = 0; i < calendar.length; i++) {
            if (date === calendar[i] && transaction.orderStatus.toLowerCase() === 'complete')
              collectOrderPerWeek[i][days[i]] = collectOrderPerWeek[i][days[i]] + 1
          }
        })
        return collectOrderPerWeek
      }

      setTotalOrderPerWeek(getOrderPerWeek())
      return () => (ref3.current = true)
    }
  }, [transactionData])

  useEffect(() => {
    if (!ref4.current && menuData) {
      const getMostOrderingMenu = () => {
        const newCollect = menuData.reduce((prev, curr) => (prev = [...prev, { [curr.name]: curr.sold }]), [])
        newCollect.sort((a, b) => {
          const keyA = Object.keys(a)[0]
          const keyB = Object.keys(b)[0]
          return b[keyB] - a[keyA]
        })
        if (newCollect.length > 4) newCollect.splice(4, newCollect.length - 1)
        return newCollect
      }

      setTotalMostOrderingGroup(getMostOrderingMenu())
      return () => (ref4.current = true)
    }
  }, [menuData])

  return { staticOverview, totalSaleCurrentYear, totalMostOrderingGroup, totalOrderPerWeek }
}

export default useOverviewData
