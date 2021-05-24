export const RATES_API_URL = process.env.REACT_APP_RATES_API_URL || 'https://swop.cx/graphql';

export enum CurrencyCode {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  CNY = 'CNY',
  CAD = 'CAD',
}

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: '$',
  GBP: '£',
  EUR: '€',
  CNY: '¥',
  CAD: '$',
};

export const RATES_POLL_INTERVAL = 10 * 1000;

export enum ROUTES {
  home = '/',
  exchange = '/exchange',
}
