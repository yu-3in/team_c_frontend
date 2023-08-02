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
