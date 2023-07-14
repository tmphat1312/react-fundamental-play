export function calculateTotalAmount(data) {
  const total = [...data.values()].reduce(
    (accumulator, currentItem) => accumulator + currentItem?.amount,
    0
  )

  return total <= 99 ? total : '99+'
}

export function calculateTotalPrice(data) {
  const total = [...data.values()].reduce(
    (accumulator, currentItem) =>
      accumulator + currentItem?.amount * currentItem?.price,
    0
  )

  return total
}

export const USMoneyFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})
