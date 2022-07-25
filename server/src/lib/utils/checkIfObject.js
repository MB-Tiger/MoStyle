


export default (val, name) => {
  if (typeof val === 'object' &&
    !Array.isArray(val) &&
    val !== null
  ) return true
  
  throw new Error(`${name} is not an object`)
}