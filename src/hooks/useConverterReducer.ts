import { useCallback, useReducer } from 'react';

import { CurrencyCode } from '../constants';
import { roundToDecimals } from '../utils';

type State = {
  base: {
    value: number;
    currency: CurrencyCode;
  };
  quote: {
    value: number;
    currency: CurrencyCode;
  };
};

type Action =
  | { type: 'SET_BASE_VALUE'; payload: { value: number; quoteRate: number } }
  | { type: 'SET_QUOTE_VALUE'; payload: { value: number; quoteRate: number } }
  | { type: 'SET_BASE_CURRENCY'; payload: CurrencyCode }
  | { type: 'SET_QUOTE_CURRENCY'; payload: CurrencyCode }
  | { type: 'RECALC_QUOTE_VALUE'; payload: number };

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
          value: roundToDecimals(action.payload.value * action.payload.quoteRate),
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
          value: roundToDecimals(action.payload.value / action.payload.quoteRate),
        },
      };

    case 'SET_BASE_CURRENCY':
      return {
        ...state,
        base: {
          ...state.base,
          currency: action.payload,
          value: 0,
        },
        quote: {
          ...state.quote,
          value: 0,
        },
      };

    case 'SET_QUOTE_CURRENCY':
      return {
        ...state,
        quote: {
          ...state.quote,
          currency: action.payload,
          value: 0,
        },
        base: {
          ...state.base,
          value: 0,
        },
      };

    case 'RECALC_QUOTE_VALUE':
      return {
        ...state,
        quote: {
          ...state.quote,
          value: roundToDecimals(state.quote.value * action.payload),
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
      value: 0,
    },
    quote: {
      currency: quoteCurrency,
      value: 0,
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
    dispatch({ type: 'SET_QUOTE_VALUE', payload: { value, quoteRate } });

  const recalcQuoteValue = useCallback(
    (quoteRate: number) => {
      dispatch({ type: 'RECALC_QUOTE_VALUE', payload: quoteRate });
    },
    [dispatch],
  );

  return {
    base,
    quote,
    setQuoteCurrency,
    setBaseCurrency,
    setBaseValue,
    setQuoteValue,
    recalcQuoteValue,
  };
};
