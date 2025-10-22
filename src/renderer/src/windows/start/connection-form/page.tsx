import z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import useQuery from '@renderer/hooks/use-query'
import Body from '@renderer/ui/components/body'
import Label from '@renderer/ui/commons/label'
import Input from '@renderer/ui/commons/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/ui/commons/select'
import ColorPicker from '@renderer/ui/commons/color-picker'
import Button from '@renderer/ui/commons/button'
import { randomColorHex } from '@renderer/utils'
import { Environment } from '@renderer/types'

const schema = z.object({
  host: z.string().min(1, 'Host is required'),
  port: z.string().min(4, 'Port is required'),
  database: z.string().optional(),
  user: z.string().min(1, 'User is required'),
  password: z.string().min(1, 'Password is required'),
  color: z.string().optional(),
  name: z.string().optional(),
  environmentId: z.string().min(1, 'Environment is required')
})

export default function ConnectionForm() {
  const [search] = useSearchParams()

  const [testing, setTesting] = React.useState(false)
  const [environments] = useQuery<Environment[]>(
    'environments',
    window.api.environments
  )

  const defaultData =
    search.get('default') && JSON.parse(search.get('default')!)

  const parentId = search.get('parentId') || undefined

  const { control, handleSubmit, setError, getValues, watch, setValue } =
    useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues: {
        port: defaultData?.port || '3306',
        host: defaultData?.host || 'localhost',
        environmentId:
          defaultData?.environmentId ?? search.get('environmentId'),
        color: defaultData?.color || randomColorHex(),
        name: defaultData?.name || '',
        database: defaultData?.database || '',
        password: defaultData?.password || '',
        user: defaultData?.user || 'root'
      }
    })

  console.log(search.get('environmentId'))

  const { environmentId } = watch()

  React.useEffect(() => {
    if (!environmentId) {
      setValue('environmentId', environments?.[0]?.id || '')
    }
  }, [environmentId])

  const onHandle = handleSubmit(async (values) => {
    if (!values.name || values.name.trim() === '') {
      return setError(
        'name',
        { message: 'Name is required' },
        {
          shouldFocus: true
        }
      )
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fn = (d: any) =>
      defaultData
        ? window.api.connectionsUpdate(defaultData.id, d)
        : window.api.connectionsCreate(d)

    try {
      await fn({
        type: 'mysql',
        name: values.name,
        color: values.color,
        database: values.database,
        host: values.host,
        password: values.password,
        port: values.port,
        user: values.user,
        environmentId: values.environmentId
      })
      window.close()
    } catch (error) {
      console.error('Failed to save connection:', error)
    }
  })

  const onTest = handleSubmit(async () => {
    const { host, password, port, user } = getValues()
    setTesting(true)

    const result = await window.api.coreTest({
      type: 'mysql',
      host,
      port,
      user,
      password
    })

    if (result.ok) {
      window.api
        .alert({
          type: 'info',
          buttons: ['OK, got it', 'Connect MySQL', 'Just Save'],
          title: 'Success',
          detail: `Connection to ${host}:${port} was successful!`,
          message: 'Connection successful'
        })
        .then((res) => {
          if (res[1]) onConnect()
          else if (res[2]) onHandle()
        })
    } else {
      window.api
        .alert({
          type: 'error',
          title: 'Error',
          buttons: ['OK, got it', 'Retry test'],
          detail: `Could not connect to ${host}:${port}`,
          message: result.error
        })
        .then((res) => {
          if (res[1]) onTest()
        })
    }

    setTesting(false)
  })

  const onConnect = handleSubmit(async (values) => {
    const res = await window.api.coreTest({
      type: 'mysql',
      host: values.host,
      port: values.port,
      user: values.user,
      password: values.password
    })
    if (!res.ok) {
      window.api.alert({
        type: 'error',
        title: 'Error',
        buttons: ['OK, got it', 'Retry test'],
        detail: `Could not connect to ${values.host}:${values.port}`,
        message: res.error
      })
      return
    }
    if (defaultData) {
      const res = await window.api.connectionsUpdate(defaultData.id, {
        type: 'mysql',
        name: values.name ?? '',
        color: values.color,
        database: values.database,
        host: values.host,
        password: values.password,
        port: values.port,
        user: values.user,
        environmentId: values.environmentId
      })
      if (res.ok) {
        await window.api.windowsMain(defaultData)
        if (parentId) await window.api.windowsClose(parentId)
        window.close()
      }
    } else {
      const res = await window.api.connectionsCreate({
        type: 'mysql',
        name: values.name || `${values.user}@${values.host}`,
        color: values.color,
        database: values.database,
        host: values.host,
        password: values.password,
        port: values.port,
        user: values.user,
        environmentId: values.environmentId
      })
      if (res.ok) {
        await window.api.windowsMain(res.data)
        if (parentId) await window.api.windowsClose(parentId)
        window.close()
      }
    }
  })

  return (
    <Body title="MySQL Connection">
      <div className="p-4 space-y-3 grow">
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <Label label="Name">
              <Input
                autoFocus
                placeholder='e.g. "My Local MySQL"'
                {...field}
                error={fieldState.error?.message}
              />
            </Label>
          )}
        />
        <Controller
          control={control}
          name="environmentId"
          render={({ field, fieldState }) => (
            <Label label="Env">
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger error={fieldState.error?.message}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {environments && environments.length > 0 ? (
                    environments?.map((env) => (
                      <SelectItem key={env.id} value={env.id}>
                        {env.name}
                      </SelectItem>
                    ))
                  ) : (
                    <p className="p-2 text-center text-xs opacity-50">
                      No environments
                    </p>
                  )}
                </SelectContent>
              </Select>
            </Label>
          )}
        />
        <Controller
          control={control}
          name="color"
          render={({ field, fieldState }) => (
            <Label label="Color">
              <ColorPicker
                error={fieldState.error?.message}
                color={field.value}
                onChangeColor={field.onChange}
              />
            </Label>
          )}
        />
        <div className="grid grid-cols-12 gap-2">
          <Controller
            control={control}
            name="host"
            render={({ field, fieldState }) => (
              <Label label="Host" className="col-span-8">
                <Input
                  placeholder="localhost"
                  {...field}
                  error={fieldState.error?.message}
                />
              </Label>
            )}
          />
          <Controller
            control={control}
            name="port"
            render={({ field, fieldState }) => (
              <Label
                label="Port"
                className="col-span-4"
                span={{
                  className: 'min-w-[30px] w-[30px]'
                }}
              >
                <Input
                  placeholder="Port"
                  {...field}
                  error={fieldState.error?.message}
                />
              </Label>
            )}
          />
        </div>
        <Controller
          control={control}
          name="user"
          render={({ field, fieldState }) => (
            <Label label="User">
              <Input
                placeholder="e.g. root"
                {...field}
                error={fieldState.error?.message}
              />
            </Label>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <Label label="Password">
              <Input
                type="password"
                placeholder="e.g. password"
                {...field}
                error={fieldState.error?.message}
              />
            </Label>
          )}
        />
        <Controller
          control={control}
          name="database"
          render={({ field, fieldState }) => (
            <Label label="Database">
              <Input
                placeholder='e.g. "my-database"'
                {...field}
                error={fieldState.error?.message}
              />
            </Label>
          )}
        />
      </div>
      <div className="flex justify-end gap-2 p-4 pt-0">
        <Button onClick={() => window.close()} className="w-[70px]">
          Cancel
        </Button>
        <div className="px-4"></div>
        <Button onClick={onHandle} type="submit" className="w-[70px]">
          {defaultData ? 'Update' : 'Save'}
        </Button>
        <Button
          type="button"
          disabled={testing}
          onClick={onTest}
          className="w-[70px]"
        >
          Test
        </Button>
        <Button disabled={testing} onClick={onConnect} className="w-[70px]">
          Connect
        </Button>
      </div>
    </Body>
  )
}
