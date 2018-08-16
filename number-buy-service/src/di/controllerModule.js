import { asClass, Lifetime } from 'awilix'
import { BuyController } from '../controllers/buyController'

export const buyControllerProvider = {
  buyController: asClass(BuyController).singleton()
}