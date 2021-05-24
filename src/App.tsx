import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import { RATES_API_URL, ROUTES } from './constants';
import { Balance } from './components/balance/balance';
import { Converter } from './components/converter/converter';
import { useAccountsReducer } from './hooks/useAccountsReducer';

const client = new ApolloClient({
  uri: RATES_API_URL,
  cache: new InMemoryCache(),
});

function App() {
  const { activeAccount, accounts, exchange, setActiveAccount } = useAccountsReducer();

  return (
    <ApolloProvider client={client}>
      <Container>
        <Router>
          <Switch>
            <Route path={ROUTES.exchange}>
              <Converter activeAccount={activeAccount} accounts={accounts} exchange={exchange} />
            </Route>
            <Route path={ROUTES.home}>
              <Balance
                activeAccount={activeAccount}
                accounts={accounts}
                setActiveAccount={setActiveAccount}
              />
            </Route>
          </Switch>
        </Router>
      </Container>
    </ApolloProvider>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(to top right, #0066eb 60%, #ff8ab3 100%);
`;

export default App;
