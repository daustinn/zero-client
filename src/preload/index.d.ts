/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ElectronAPI } from '@electron-toolkit/preload'
import {
  AlertProps,
  AlertReturn,
  AwaitableResponse,
  Connection,
  ConnectionInput,
  Entity,
  Environment,
  EnvironmentInput,
  Id,
  MoveConnectionInput,
  Query,
  QueryInput,
  TestConnectionRequest,
  WindowConnectionProps,
  WindowQueriesProps
} from 'src/types'

export interface WindowWithIpcRenderer {
  id: () => Id
  openExternal: (url: string) => void
  alert: (_: AlertProps) => AlertReturn

  // Windows
  windowsConnection: (_: WindowConnectionProps) => AwaitableResponse<void>
  windowsEnvironment: (_?: Environment) => AwaitableResponse<void>
  windowsMain: (_: Connection, __?: boolean) => AwaitableResponse<void>
  windowsQueries: (_: string) => AwaitableResponse<void>
  windowsStart: () => void
  windowsClose: (_: string) => void
  windowsFocusSubscribe: (call: (f: boolean) => void) => Unsubscribe

  // Zero: Environments
  environments: () => AwaitableResponse<Environment[]>
  environmentsCreate: (_: EnvironmentInput) => AwaitableResponse<Environment>
  environmentsUpdate: (
    _: string,
    __: EnvironmentInput
  ) => AwaitableResponse<Environment>
  environmentsDelete: (_: string) => AwaitableResponse<void>
  environmentsSubscribe: (call: (list: Environment[]) => void) => Unsubscribe

  // Zero: Connections
  connections: () => AwaitableResponse<Connection[]>
  connectionsOne: (_: string) => AwaitableResponse<Connection | null>
  connectionsCreate: (_: ConnectionInput) => AwaitableResponse<Connection>
  connectionsUpdate: (
    _: string,
    __: ConnectionInput
  ) => AwaitableResponse<Connection>
  connectionsDelete: (_: string) => AwaitableResponse<void>
  connectionsSubscribe: (call: (list: Connection[]) => void) => Unsubscribe

  // Zero: Queries
  queries: (q?: string) => AwaitableResponse<Query[]>
  queriesOne: (_: string) => AwaitableResponse<Query | null>
  queriesCreate: (_: QueryInput) => AwaitableResponse<Query>
  queriesUpdate: (_: string, __: QueryInput) => AwaitableResponse<Query>
  queriesDelete: (_: string) => AwaitableResponse<Query[]>
  queriesLast: (_: string) => AwaitableResponse<Query | null>
  queriesSubscribe: (call: (list: Query[]) => void) => Unsubscribe
  queriesChange: (winId: string, query: Query) => AwaitableResponse<void>
  queriesChangeCurrent: (query: Query) => AwaitableResponse<void>
  queriesChangeSubscribe: (call: (f: Query) => void) => Unsubscribe

  // Core
  coreTest: (_: TestConnectionRequest) => AwaitableResponse<string>
  coreEntities: (_: string, __: Connection) => AwaitableResponse<Entity[]>
  coreCommand: (
    _: string,
    __: Connection
  ) => AwaitableResponse<ResultCommand<any[]>>
}

export type EventPayloadMapping = {
  id: []
  'shell:openexternal': [string]
  alert: [AlertProps]

  // Windows
  'windows:connection': [Id, WindowConnectionProps]
  'windows:environment': [Id, Environment?]
  'windows:start': []
  'windows:main': [Connection, boolean?]
  'windows:queries': [Id, string]
  'windows:close': [string]

  // Zero: Environments
  'zero:environments': []
  'zero:environments:store': [EnvironmentInput]
  'zero:environments:update': [string, EnvironmentInput]
  'zero:environments:delete': [string]
  'zero:environments:subscribe': [(list: Environment[]) => void]

  // Zero: Connections
  'zero:connections': []
  'zero:connections:one': [string]
  'zero:connections:store': [ConnectionInput]
  'zero:connections:update': [string, ConnectionInput]
  'zero:connections:delete': [string]
  'zero:connections:subscribe': [(list: Connection[]) => void]

  // Zero: Queries
  'zero:queries': [string?]
  'zero:queries:one': [string]
  'zero:queries:store': [QueryInput]
  'zero:queries:update': [string, QueryInput]
  'zero:queries:delete': [string]
  'zero:queries:last': [string]
  'zero:queries:subscribe': [(list: Query[]) => void]
  'zero:queries:change': [Id, Query]
  'zero:queries:change:subscribe': [(_: Query) => void]

  // Core
  'core:test': [TestConnectionRequest]
  'core:entities': [Id, string, Connection]
  'core:command': [Id, string, Connection]
}

export type IpcReturnTypeMapping = {
  id: Id
  'shell:openexternal': void
  alert: AlertReturn

  // Windows
  'windows:connection': AwaitableResponse<void>
  'windows:environment': AwaitableResponse<void>
  'windows:main': AwaitableResponse<void>
  'windows:queries': AwaitableResponse<void>
  'windows:start': void
  'windows:close': void

  // Zero: Environments
  'zero:environments': AwaitableResponse<Environment[]>
  'zero:environments:store': AwaitableResponse<Environment>
  'zero:environments:update': AwaitableResponse<Environment>
  'zero:environments:delete': AwaitableResponse<void>
  'zero:environments:subscribe': Unsubscribe

  // Zero: Connections
  'zero:connections': AwaitableResponse<Connection[]>
  'zero:connections:one': AwaitableResponse<Connection | null>
  'zero:connections:store': AwaitableResponse<Connection>
  'zero:connections:update': AwaitableResponse<Connection>
  'zero:connections:delete': AwaitableResponse<void>
  'zero:connections:subscribe': Unsubscribe

  // Zero: Queries
  'zero:queries': AwaitableResponse<Query[]>
  'zero:queries:one': AwaitableResponse<Query | null>
  'zero:queries:store': AwaitableResponse<Query>
  'zero:queries:update': AwaitableResponse<Query>
  'zero:queries:delete': AwaitableResponse<Query[]>
  'zero:queries:last': AwaitableResponse<Query | null>
  'zero:queries:subscribe': Unsubscribe
  'zero:queries:change': AwaitableResponse<void>
  'zero:queries:change:subscribe': Unsubscribe

  // Core
  'core:test': AwaitableResponse<string>
  'core:entities': AwaitableResponse<Entity[]>
  'core:command': AwaitableResponse<ResultCommand<any[]>>
}

export type Api = WindowWithIpcRenderer

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
