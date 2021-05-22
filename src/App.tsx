import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'

import './App.css'
import { Converter } from './components/converter'

const client = new ApolloClient({
  // TODO: hide the key
  uri: 'https://swop.cx/graphql?api-key=7b5ca5b28c778e72f601630bf3cc5faed8398a820b964def319bd80799302c48',
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Converter />
    </ApolloProvider>
  )
}

export default App
