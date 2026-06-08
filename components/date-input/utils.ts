export const MM_DD_YYYY_PATTERN = /^(\d{2})\/(\d{2})\/(\d{4})$/

export function formatDateDigits(digits: string): string {
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

export function isAllowedDateDigits(digits: string): boolean {
  if (digits.length === 0) return true

  if (digits.length >= 1 && !/^[0-9]$/.test(digits[0]!)) return false
  if (digits.length >= 2 && !/^(0[1-9]|1[0-2])$/.test(digits.slice(0, 2))) {
    return false
  }

  if (digits.length >= 3 && !/^[0-3]$/.test(digits[2]!)) return false
  if (digits.length >= 4 && !/^(0[1-9]|[12][0-9]|3[01])$/.test(digits.slice(2, 4))) {
    return false
  }

  if (digits.length > 4 && !/^\d+$/.test(digits.slice(4))) return false

  return true
}

export function parseMMDDYYYY(value: string): Date | null {
  const match = MM_DD_YYYY_PATTERN.exec(value)
  if (!match) return null

  const month = Number(match[1])
  const day = Number(match[2])
  const year = Number(match[3])
  const date = new Date(year, month - 1, day)

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null
  }

  return date
}

export function isValidMMDDYYYY(value: string): boolean {
  return parseMMDDYYYY(value) !== null
}
