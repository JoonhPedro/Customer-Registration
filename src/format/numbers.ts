export const getNumbers = (value: string, length?: number): string => {
  return value.replace(/\D/gm, '').slice(0, length || value.length)
}
