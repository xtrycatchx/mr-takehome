import { asClass } from 'awilix'
import { Messaging } from '../pubsub/messaging'

export const messagingProvider = {
  messaging: asClass(Messaging).singleton()
}