import { gql } from '@apollo/client'

const RATE_FIELDS = gql`
  fragment rateFields on Rate {
    quote
    baseCurrency
    quoteCurrency
  }
`

// # TODO: use fragments
export const GET_LATEST_RATES = gql`
  ${RATE_FIELDS}
  query getLatestRates {
    USD: latest(baseCurrency: "USD", quoteCurrencies: ["EUR", "GBP"]) {
      ...rateFields
    }
    EUR: latest(baseCurrency: "EUR", quoteCurrencies: ["USD", "GBP"]) {
      ...rateFields
    }
    GBP: latest(baseCurrency: "GBP", quoteCurrencies: ["USD", "EUR"]) {
      ...rateFields
    }
  }
`
