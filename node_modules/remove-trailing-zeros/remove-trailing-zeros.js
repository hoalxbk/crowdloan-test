module.exports = function(value) {
  value = value.toString()

  // console.log('Starting with:', value, value.indexOf('.'))

  // if not containing a dot, we do not need to do anything
  if (value.indexOf('.') === -1) {
    return value
  }

  var cutFrom = value.length - 1

  // as long as the last character is a 0, remove it
  do {
    // console.log('Checking:', value[cutFrom], cutFrom)

    if (value[cutFrom] === '0') {
      cutFrom--
    }

  } while (value[cutFrom] === '0')

  // final check to make sure we end correctly
  if (value[cutFrom] === '.') {
    cutFrom--
  }

  return value.substr(0, cutFrom + 1)
}
