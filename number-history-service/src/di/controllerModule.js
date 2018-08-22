import { asClass, Lifetime } from 'awilix'
import { HistoryController } from '../controllers/historyController'

export const historyControllerProvider = {
  historyController: asClass(HistoryController).singleton()
}