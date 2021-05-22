import { gql, useQuery } from '@apollo/client'
import { GET_LATEST_RATES } from '../operations/queries/getLatestRates'

export const Converter: React.FC = () => {
  const { loading, error, data } = useQuery(GET_LATEST_RATES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div className="converter">
      data will be here \n data will be here data will be here data will be here
    </div>
  )
}
