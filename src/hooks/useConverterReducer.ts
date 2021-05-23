import { useReducer } from 'react';

import { CurrencyCode } from '../constants';

type State = {
  base: {
    value?: number;
    currency: CurrencyCode;
  };
  quote: {
    value?: number;
    currency: CurrencyCode;
  };
};

type Action =
  | { type: 'SET_BASE_VALUE'; payload: { value: number; quoteRate: number } }
  | { type: 'SET_QUOTE_VALUE'; payload: { value: number; quoteRate: number } }
  | { type: 'SET_BASE_CURRENCY'; payload: CurrencyCode }
  | { type: 'SET_QUOTE_CURRENCY'; payload: CurrencyCode };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_BASE_VALUE':
      return {
        ...state,
        base: {
          ...state.base,
          value: action.payload.value,
        },
        quote: {
          ...state.quote,
          value: action.payload.value * action.payload.quoteRate,
        },
      };

    case 'SET_QUOTE_VALUE':
      return {
        ...state,
        quote: {
          ...state.quote,
          value: action.payload.value,
        },
        base: {
          ...state.base,
          value: action.payload.value * action.payload.quoteRate,
        },
      };

    case 'SET_BASE_CURRENCY':
      return {
        ...state,
        base: {
          ...state.base,
          currency: action.payload,
        },
      };

    case 'SET_QUOTE_CURRENCY':
      return {
        ...state,
        quote: {
          ...state.quote,
          currency: action.payload,
        },
      };

    default:
      return state;
  }
};

export const useConverterReducer = ({
  baseCurrency,
  quoteCurrency,
}: {
  baseCurrency: CurrencyCode;
  quoteCurrency: CurrencyCode;
}) => {
  const initialState: State = {
    base: {
      currency: baseCurrency,
    },
    quote: {
      currency: quoteCurrency,
    },
  };

  const [{ base, quote }, dispatch] = useReducer(reducer, initialState);

  const setQuoteCurrency = (value: CurrencyCode) =>
    dispatch({ type: 'SET_QUOTE_CURRENCY', payload: value });

  const setBaseCurrency = (value: CurrencyCode) =>
    dispatch({ type: 'SET_BASE_CURRENCY', payload: value });

  const setBaseValue = (value: number, quoteRate: number) =>
    dispatch({ type: 'SET_BASE_VALUE', payload: { value, quoteRate } });

  const setQuoteValue = (value: number, quoteRate: number) =>
    dispatch({ type: 'SET_BASE_VALUE', payload: { value, quoteRate } });

  return { base, quote, setQuoteCurrency, setBaseCurrency, setBaseValue, setQuoteValue };
};
