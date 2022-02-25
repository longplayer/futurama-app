const filters = {
  getFullName(name) {
    return `${name.first} ${name.middle.length ? '"' + name.middle + '"' : ''} ${name.last}`
  },
}

export default filters
