import { createContainer } from 'awilix'
import * as settingsModule from './settingsModule'
import * as controllerModule from './controllerModule'
import * as dataAccessModule from './dataAccessModule'
import * as persistenceModule from './persistenceModule'

export const container = createContainer()

container
    .register(controllerModule.updateControllerProvider)
    .register(controllerModule.randomControllerProvider)
    .register(dataAccessModule.dataAccessProvider)
    .register(persistenceModule.persistenceManagerProvider)
    .register(settingsModule.redisConfigProvider)