/* eslint-disable @typescript-eslint/no-explicit-any */
import { MessageBoxOptions } from 'electron'

export type ResponseSuccess<T> = {
  ok: true
  data: T
}

export type ResponseError = {
  ok: false
  error: string
}

export type Response<T = any> = ResponseSuccess<T> | ResponseError

export type AwaitableResponse<T = any> = Promise<Response<T>>

export type Callback<T> = (data: T) => void

export type Unsubscribe = () => void

export type Id = string | null | undefined

type EntityColumn = {
  name: string
  type: string
  nullable: 'YES' | 'NO'
  key: 'PRI' | 'MUL' | 'UNI' | null
}

export type Entity = {
  name: string
  columns: EntityColumn[]
}

export type ResultCommand<T> = {
  results: T
  fields: any[]
}

export type QueriesWindowProps = {
  currentQueryId?: string
  parentId?: Id
}

export type Environment = {
  id: string
  name: string
  createdAt: string
  updatedAt: string | null
}

export type EnvironmentInput = Omit<
  Environment,
  'id' | 'createdAt' | 'updatedAt'
>

export type Connection = {
  id: string
  name: string
  type: 'mysql'
  host?: string
  port?: string
  color?: string
  database?: string
  user?: string
  password?: string
  environmentId?: string
  environment?: Environment | null
  createdAt: string
  updatedAt: string | null
}

export type ConnectionInput = Omit<
  Connection,
  'id' | 'createdAt' | 'updatedAt' | 'environment'
>

export type Query = {
  id: string
  name: string | null
  content: string | null
  connectionId: string | null
  createdAt: string
  updatedAt: string
}

export type QueryInput = Omit<Query, 'id' | 'createdAt' | 'updatedAt'> & {
  onUpdatedAt?: boolean
}

interface TestConnectionBaseRequest {
  type: 'mysql'
}

interface MySqlTestConnectionRequest extends TestConnectionBaseRequest {
  type: 'mysql'
  host: string
  port: string
  user: string
  password: string
  database?: string
}

export type TestConnectionRequest = MySqlTestConnectionRequest

export type MoveConnectionInput = {
  id: string
  envId: string
}

export type WindowConnectionProps = {
  provider?: Connection['type']
  environmentId?: string
  connetion?: Connection
}

export type WindowQueriesProps = {
  currentQueryId?: string
  parentId?: Id
}

export type AlertProps = {
  type?: MessageBoxOptions['type']
  parentId?: Id
  title?: string
  message?: string
  detail?: string
  buttons?: string[]
}

export type AlertReturn = Promise<Array<boolean>>
