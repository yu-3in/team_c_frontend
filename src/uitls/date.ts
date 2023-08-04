export const formatDateTime = (originalDateString: string) => {
  const date = new Date(originalDateString)

  const formattedDate = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
    2,
    '0'
  )}/${String(date.getDate()).padStart(2, '0')}`
  const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes()
  ).padStart(2, '0')}`

  const formattedDateTime = `${formattedDate} ${formattedTime}`

  return formattedDateTime
}

const formatToISOString = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`
}
export const checkExpired = (dueDate: string) => {
  const today = new Date()
  const formatToday = formatToISOString(today)
  // console.log(formatToday)
  // console.log(dueDate)

  return formatToday > dueDate
}
