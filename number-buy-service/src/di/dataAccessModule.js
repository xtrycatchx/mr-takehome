import { asClass } from 'awilix'
import { DataAccess } from '../persistence/dataAccess'

export const dataAccessProvider = {
  dataAccess: asClass(DataAccess).singleton()
}