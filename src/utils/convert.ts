import { isPlainObject, isArray, mapKeys, mapValues, snakeCase } from 'lodash-es'

export function convertToSnakeCase<T>(obj: any): T {
  if (isArray(obj)) {
    return obj.map(convertToSnakeCase) as T
  } else if (isPlainObject(obj)) {
    return mapValues(
      mapKeys(obj, (v, k) => snakeCase(k)),
      convertToSnakeCase,
    ) as T
  }
  return obj
}
