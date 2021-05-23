import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import { CurrencyCode, RATES_API_URL, ROUTES } from './constants';
import { Balance } from './components/balance/balance';
import { Converter } from './components/converter/converter';

const client = new ApolloClient({
  uri: RATES_API_URL,
  cache: new InMemoryCache(),
});

const initialState = {
  activeAccount: CurrencyCode.USD,
  accountsByCurrency: {
    [CurrencyCode.USD]: {
      amount: 100.23,
    },
    [CurrencyCode.EUR]: {
      amount: 200.34,
    },
    [CurrencyCode.GBP]: {
      amount: 300.45,
    },
  },
};

type Account = {
  amount: number;
};

export type AccountsByCurrency = Partial<Record<CurrencyCode, Account>>;

type State = {
  activeAccount: CurrencyCode;
  accountsByCurrency: AccountsByCurrency;
};

type Action =
  | { type: 'SET_ACTIVE_ACCOUNT'; payload: CurrencyCode }
  | { type: 'SET_ACCOUNT_AMOUNT' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_ACTIVE_ACCOUNT':
      return {
        ...state,
        activeAccount: action.payload,
      };

    default:
      return state;
  }
};

function App() {
  const [{ activeAccount, accountsByCurrency }, dispatch] = useReducer(reducer, initialState);

  const setActiveAccount = (value: CurrencyCode) =>
    dispatch({ type: 'SET_ACTIVE_ACCOUNT', payload: value });

  return (
    <ApolloProvider client={client}>
      <Container>
        <Router>
          <Switch>
            <Route path={ROUTES.exchange}>
              <Converter activeAccount={activeAccount} accounts={accountsByCurrency} />
            </Route>
            <Route path={ROUTES.home}>
              <Balance
                activeAccount={activeAccount}
                accounts={accountsByCurrency}
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
