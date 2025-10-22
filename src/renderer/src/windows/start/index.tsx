import useQuery from '@renderer/hooks/use-query'
import Body from '@renderer/ui/components/body'
import * as React from 'react'
import Enviroments from './components/environments'

export default function StartWindow() {
  const [connections, loading, { setData, execute }] = useQuery(
    'connections',
    window.api.connections
  )

  React.useEffect(() => {
    const unsub = window.api.connectionsSubscribe(setData)
    return unsub
  }, [])

  return (
    <Body title="Zero Client">
      {loading ? (
        <div className="grow grid place-content-center">
          <p className="text-xs opacity-30">Loading...</p>
        </div>
      ) : (
        <Enviroments refetch={execute} connections={connections} />
      )}
    </Body>
  )
}
