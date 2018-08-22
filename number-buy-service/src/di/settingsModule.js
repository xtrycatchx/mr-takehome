import { asValue } from 'awilix'
import * as config from '../config'

export const mysqlConfigProvider = {
  mysqlConfig: asValue(config.mysqlConfig)
}

export const redisConfigProvider = {
  redisConfig: asValue(config.redisConfig)
}