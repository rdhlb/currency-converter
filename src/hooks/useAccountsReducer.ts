import { useReducer } from 'react';

import { CurrencyCode } from '../constants';

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

export type TransactionData = { account: CurrencyCode; newAmount: number };

type Action =
  | { type: 'SET_ACTIVE_ACCOUNT'; payload: CurrencyCode }
  | {
      type: 'EXCHANGE_BETWEEN_ACCOUNTS';
      payload: {
        from: TransactionData;
        to: TransactionData;
      };
    };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_ACTIVE_ACCOUNT':
      return {
        ...state,
        activeAccount: action.payload,
      };

    case 'EXCHANGE_BETWEEN_ACCOUNTS':
      const { from, to } = action.payload;

      return {
        ...state,
        accountsByCurrency: {
          ...state.accountsByCurrency,
          [from.account]: {
            ...state.accountsByCurrency[from.account],
            amount: from.newAmount,
          },
          [to.account]: {
            ...state.accountsByCurrency[to.account],
            amount: to.newAmount,
          },
        },
      };

    default:
      return state;
  }
};

export const useAccountsReducer = () => {
  const [{ activeAccount, accountsByCurrency }, dispatch] = useReducer(reducer, initialState);

  const setActiveAccount = (value: CurrencyCode) =>
    dispatch({ type: 'SET_ACTIVE_ACCOUNT', payload: value });

  const exchange = (from: TransactionData, to: TransactionData) => {
    dispatch({ type: 'EXCHANGE_BETWEEN_ACCOUNTS', payload: { from, to } });
  };

  return { setActiveAccount, exchange, activeAccount, accounts: accountsByCurrency };
};
