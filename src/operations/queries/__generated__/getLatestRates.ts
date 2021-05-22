/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getLatestRates
// ====================================================

export interface getLatestRates_USD {
  __typename: "Rate";
  quote: any;
  baseCurrency: string;
  quoteCurrency: string;
}

export interface getLatestRates_EUR {
  __typename: "Rate";
  quote: any;
  baseCurrency: string;
  quoteCurrency: string;
}

export interface getLatestRates_GBP {
  __typename: "Rate";
  quote: any;
  baseCurrency: string;
  quoteCurrency: string;
}

export interface getLatestRates {
  /**
   * Returns the latest rates
   */
  USD: getLatestRates_USD[];
  /**
   * Returns the latest rates
   */
  EUR: getLatestRates_EUR[];
  /**
   * Returns the latest rates
   */
  GBP: getLatestRates_GBP[];
}
