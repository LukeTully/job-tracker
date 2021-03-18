export const generateTimestamp = () => {
  return Date.now()
}

export function generateIndex(title, company) {
  const initialIndex = `${title}-at-${company}`
  const spacesToDashes = initialIndex.replace(/\s+/g, '-')
  const lowercase = spacesToDashes.toLowerCase()
  const punctuationRemoved = lowercase.replace(/[^a-zA-Z0-9\s-]+/g, '')
  return encodeURIComponent(punctuationRemoved)
}

export function validateMinimumSalary() {
  // Only check that the value is
}

export function required(propName) {
  throw new Error(`${propName} is required`)
}
