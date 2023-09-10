export const dateNow = () => {
  const newDate = new Date()
  const date = newDate.getDate().toString().padStart(2, '0')
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0')

  return `${date}-${month}-${newDate.getFullYear()}`
}

export const monthAndYearNow = () => {
  const newDate = new Date()
  return `${(newDate.getMonth() + 1).toString().padStart(2, '0')}-${newDate.getFullYear()}`
}

export const timeNow = () => {
  const newDate = new Date()
  const hours = newDate.getHours().toString().padStart(2, '0')
  const minutes = newDate.getMinutes().toString().padStart(2, '0')
  const seconds = newDate.getSeconds().toString().padStart(2, '0')
  return `${hours}:${minutes}:${seconds}:${newDate.getMilliseconds()}`
}

export const hours = () => {
  const newDate = new Date()
  return newDate.getHours().toString().padStart(2, '0')
}

export const minutes = () => {
  const newDate = new Date()
  return newDate.getMinutes().toString().padStart(2, '0')
}

export const seconds = () => {
  const newDate = new Date()
  return newDate.getSeconds().toString().padStart(2, '0')
}

export const timestamps = () => {
  return `${dateNow()} ${timeNow()}`
}

export const getTime = (dateTime) => {
  if (typeof dateTime !== 'string') throw new Error('dateTime must be a string')
  const time = dateTime.split(' ')[1].split(':')
  return `${time[0]}:${time[1]}`
}
export const getDate = (dateTime) => {
  if (typeof dateTime !== 'string') throw new Error('dateTime must be a string')
  const date = dateTime.split(' ')[0]
  return `${date}`
}
export const getMonthAndYear = (dateTime) => {
  if (typeof dateTime !== 'string') throw new Error('dateTime must be a string')
  const date = dateTime.split(' ')[0].split('-')
  return `${date[1]}-${date[2]}`
}
