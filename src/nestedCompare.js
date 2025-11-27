import _ from 'lodash'

const isObject = value => typeof value === 'object' && value !== null

const findDiffNested = (data1, data2) => {
  const iter = (d1, d2) => {
    const diff = {}
    const keys = _.sortBy(_.union(Object.keys(d1), Object.keys(d2)))

    keys.map((key) => {
      if (!Object.hasOwn(d1, key)) {
        diff[`+ ${key}`] = d2[key]
      }
      else if (!Object.hasOwn(d2, key)) {
        diff[`- ${key}`] = d1[key]
      }
      else if (d1[key] === d2[key]) {
        diff[`  ${key}`] = d1[key]
      }
      else if (isObject(d1[key]) && isObject(d2[key])) {
        diff[`  ${key}`] = iter(d1[key], d2[key])
      }
      else {
        diff[`- ${key}`] = d1[key]
        diff[`+ ${key}`] = d2[key]
      }
      return diff
    })

    return diff
  }
  const globalDiff = iter(data1, data2)
  return globalDiff
}

export default findDiffNested
