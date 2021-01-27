function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = {
  getRandomElement,
  asyncForEach,
  sleep,
}
