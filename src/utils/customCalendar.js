const customCalendar = () => {
  const date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth(),
    currDate = date.getDate()

  const firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate()

  // console.log(`firstDayofMonth: ${firstDayofMonth}`, `lastDateofMonth: ${lastDateofMonth}`, `lastDayofMonth: ${lastDayofMonth}`, `lastDateofLastMonth: ${lastDateofLastMonth}`)

  const getDayByDate = ({ date, year = currYear, month = currMonth }) => {
    return new Date(year, month, date).getDay()
  }

  const getCalendar = () => {
    let collectDate = []

    for (let i = firstDayofMonth; i > 0; i--) {
      const getDate = lastDateofLastMonth - i + 1
      collectDate.push({ day: getDayByDate({ date: getDate, month: currMonth - 1 }), date: getDate })
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      collectDate.push({ day: getDayByDate({ date: i, month: currMonth }), date: i })
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      const getDate = i - lastDayofMonth + 1
      collectDate.push({ date: getDate, day: getDayByDate({ date: getDate, month: currMonth + 1 }) })
    }
    return collectDate
  }

  const getCurrentWeek = () => {
    const day = getDayByDate({ date: currDate })
    const currentWeek = []

    for (let d = currDate - day; d < currDate; d++) {
      if (d < 1) {
        currentWeek.push('-')
      } else {
        currentWeek.push(d)
      }
    }
    currentWeek.push(currDate)
    for (let d = day; d < 6; d++) {
      const getDate = currDate + (d - day + 1)
      if (getDate > lastDateofMonth) {
        currentWeek.push('-')
      } else {
        currentWeek.push(currDate + (d - day + 1))
      }
    }
    return currentWeek
  }
  const getFullDateCurrentWeek = () => {
    const day = getDayByDate({ date: currDate })
    const currentWeek = []

    for (let d = currDate - day; d < currDate; d++) {
      if (d < 1) {
        currentWeek.push('-')
      } else {
        currentWeek.push(
          `${d.toString().padStart(2, '0')}-${(currMonth + 1).toString().padStart(2, '0')}-${currYear.toString()}`
        )
      }
    }
    currentWeek.push(
      `${currDate.toString().padStart(2, '0')}-${(currMonth + 1).toString().padStart(2, '0')}-${currYear.toString()}`
    )
    for (let d = day; d < 6; d++) {
      const getDate = currDate + (d - day + 1)
      if (getDate > lastDateofMonth) {
        currentWeek.push('-')
      } else {
        currentWeek.push(
          `${(currDate + (d - day + 1)).toString().padStart(2, '0')}-${(currMonth + 1)
            .toString()
            .padStart(2, '0')}-${currYear.toString()}`
        )
      }
    }
    return currentWeek
  }
  return {
    date,
    currDate,
    currMonth,
    currYear,
    firstDayofMonth,
    lastDayofMonth,
    lastDateofMonth,
    lastDateofLastMonth,
    getCalendar,
    getCurrentWeek,
    getFullDateCurrentWeek,
    getDayByDate
  }
}

export default customCalendar
