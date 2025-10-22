import z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useSearchParams } from 'react-router-dom'
import { Environment } from '@renderer/types'
import Body from '@renderer/ui/components/body'
import Label from '@renderer/ui/commons/label'
import Input from '@renderer/ui/commons/input'
import Button from '@renderer/ui/commons/button'

const schema = z.object({
  name: z.string().min(1, 'Name is required')
})

export default function EnvironmentForm() {
  const [search] = useSearchParams()

  const defaultData: Environment =
    search.get('default') && JSON.parse(search.get('default')!)

  const { control, handleSubmit } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: defaultData?.name || ''
    }
  })

  const onHandle = handleSubmit((values) => {
    try {
      defaultData
        ? window.api.environmentsUpdate(defaultData.id, {
            name: values.name
          })
        : window.api.environmentsCreate({
            name: values.name
          })
      window.close()
    } catch (error) {
      console.error('Failed to save environment:', error)
    }
  })

  return (
    <Body
      title={defaultData ? `Edit env: ${defaultData.name}` : 'New Environment'}
    >
      <div className="p-4 space-y-3 grow">
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <Label label="Name" className="col-span-7">
              <Input
                autoFocus
                placeholder='e.g. "Development", "Production"'
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
        <Button onClick={onHandle} type="submit" className="w-[70px]">
          {defaultData ? 'Update' : 'Create'}
        </Button>
      </div>
    </Body>
  )
}
