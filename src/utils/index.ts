import { Response, ResponseError, ResponseSuccess } from '../types'

export function response<T>(ok: true, data: T): ResponseSuccess<T>
export function response(ok: false, error: string): ResponseError
export function response<T>(ok: boolean, payload: T | string): Response<T> {
  if (ok) {
    return { ok: true, data: payload as T }
  } else {
    return { ok: false, error: payload as string }
  }
}
