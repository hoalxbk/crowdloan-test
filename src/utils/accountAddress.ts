export const trimMiddlePartAddress = (address: string, digits: number = 6) => {
  return `${address.substring(0, digits)}...${address.substring(address.length - 3, address.length)}`
}
