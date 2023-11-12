// GroupBy helper for colections
export const groupBy = (xs, key) => {
  return xs.reduce((rv, x) => {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

// minutes to milliseconds
export const msToM = value => value * 60 * 1000

// random integer between given min and max
export const getRandomBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

export const getRandomTimer = (min, max) =>
  getRandomBetween(msToM(min), msToM(max))

export const getRandomFromArray = (array = []) => {
  const randomPosition = Math.floor(Math.random() * array.length)
  return array[randomPosition]
}

export const getShuffleVersion = array => {
  let resArr = [...array]
  for (var i = resArr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = resArr[i]
    resArr[i] = resArr[j]
    resArr[j] = temp
  }
  return resArr
}
