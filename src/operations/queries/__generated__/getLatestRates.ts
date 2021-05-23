/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getLatestRates
// ====================================================

export interface getLatestRates_latest {
  __typename: "Rate";
  quote: any;
  baseCurrency: string;
  quoteCurrency: string;
}

export interface getLatestRates {
  /**
   * Returns the latest rates
   */
  latest: getLatestRates_latest[];
}

export interface getLatestRatesVariables {
  baseCurrency: string;
  quoteCurrency: string;
}
