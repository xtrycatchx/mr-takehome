import { asClass, Lifetime } from 'awilix'
import { UpdateController } from '../controllers/updateController'
import { RandomController } from '../controllers/randomController'

export const updateControllerProvider = {
  updateController: asClass(UpdateController).singleton()
}

export const randomControllerProvider = {
  randomController: asClass(RandomController).singleton()
}