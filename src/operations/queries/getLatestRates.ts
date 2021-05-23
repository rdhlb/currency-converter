import { gql } from '@apollo/client';

const RATE_FIELDS = gql`
  fragment rateFields on Rate {
    quote
    baseCurrency
    quoteCurrency
  }
`;

export const GET_LATEST_RATES = gql`
  ${RATE_FIELDS}
  query getLatestRates($baseCurrency: String!, $quoteCurrency: String!) {
    latest(baseCurrency: $baseCurrency, quoteCurrencies: [$quoteCurrency]) {
      ...rateFields
    }
  }
`;
