import { asValue } from 'awilix'
import * as config from '../config'

export const redisConfigProvider = {
  redisConfig: asValue(config.redisConfig)
}