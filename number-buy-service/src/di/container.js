import { createContainer } from 'awilix'
import * as settingsModule from './settingsModule'
import * as controllerModule from './controllerModule'
import * as dataAccessModule from './dataAccessModule'
import * as persistenceModule from './persistenceModule'
import * as messagingModule from './messagingModule'

export const container = createContainer()

container
    .register(controllerModule.buyControllerProvider)
    .register(dataAccessModule.dataAccessProvider)
    .register(persistenceModule.persistenceManagerProvider)
    .register(settingsModule.mysqlConfigProvider)
    .register(settingsModule.redisConfigProvider)
    .register(messagingModule.messagingProvider)