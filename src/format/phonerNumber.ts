export const formatPhoneNumber = (value: string) => {
  const formatValue = value.replace(/\D+/g, '')

  if (formatValue) {
    return formatValue
      .replace(/(\d{0})(\d)/, `$1+$2`)
      .replace(/(\d{2})(\d)/, `$1 $2`)
      .replace(/(\d{2})\s?(\d{2})(\d)/, '$1 ($2) $3')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')
  }
}
