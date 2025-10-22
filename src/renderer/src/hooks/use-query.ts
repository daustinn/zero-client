import * as React from 'react'
import { Response } from '../../../types'
type CacheItem<T> = {
  data: T
  timestamp: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cacheState = new Map<string, CacheItem<any>>()

type Props<T> = {
  onSuccess?: (data: T) => void
  onError?: (error: string) => void
  onFinish?: () => void
  enabled?: boolean
  cache?: boolean
  lifeCache?: number
}

type ReturnDetail<T> = {
  execute: () => Promise<void>
  error: string | null
  setData: React.Dispatch<React.SetStateAction<T | null>>
}

type Return<T> = [null, true, ReturnDetail<T>] | [T, false, ReturnDetail<T>]

export default function useQuery<T>(
  key: string,
  callback: () => Promise<Response<T>> | Response<T>,
  props?: Props<T>
): Return<T> {
  const {
    onError,
    onFinish,
    onSuccess,
    enabled = true,
    cache = true,
    lifeCache = 10000
  } = props || {}

  const isCacheValid = React.useCallback(
    (item: CacheItem<T>) => Date.now() - item.timestamp < lifeCache,
    [lifeCache]
  )

  const [loading, setLoading] = React.useState(
    enabled &&
      (!cacheState.get(key) ||
        !isCacheValid(cacheState.get(key) as CacheItem<T>))
      ? true
      : false
  )
  const [error, setError] = React.useState<string | null>(null)
  const [data, setData] = React.useState<T | null>(
    cache &&
      cacheState.get(key) &&
      isCacheValid(cacheState.get(key) as CacheItem<T>)
      ? cacheState.get(key)?.data
      : null
  )

  const execute = React.useCallback(
    async (force: boolean = false, loading: boolean = true) => {
      if (loading) setLoading(true)
      setError(null)

      if (
        cacheState.get(key) &&
        !force &&
        cache &&
        isCacheValid(cacheState.get(key) as CacheItem<T>)
      ) {
        setData(cacheState.get(key)?.data)
        setLoading(false)
        return
      }

      try {
        const result = await callback()
        if (!result.ok) {
          setError(result.error)
          onError?.(result.error)
          cacheState.delete(key)
        } else {
          cacheState.set(key, {
            data: result.data,
            timestamp: Date.now()
          })
          onSuccess?.(result.data as T)
          setData(result.data as T)
        }
      } catch (err) {
        cacheState.delete(key)
        onError?.((err as Error).message)
        setError((err as Error).message)
      } finally {
        onFinish?.()
        setLoading(false)
      }
    },
    [key, cache, isCacheValid, callback, onError, onSuccess, onFinish]
  )

  React.useEffect(() => {
    setData(null)
    setError(null)
    if (enabled) execute(false, false)
  }, [enabled, key])

  React.useEffect(() => {
    setData(null)
    setError(null)
    if (enabled) execute(false, true)
  }, [key])

  const returnValues = React.useMemo((): Return<T> => {
    return loading
      ? [null, true, { execute: () => execute(true, false), error, setData }]
      : [
          data as T,
          loading,
          { execute: () => execute(true, false), error, setData }
        ]
  }, [loading, data, execute, error])

  return returnValues
}
