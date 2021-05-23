export const RATES_API_URL =
  'https://swop.cx/graphql?api-key=7b5ca5b28c778e72f601630bf3cc5faed8398a820b964def319bd80799302c48';
export const RATES_API_KEY = '';

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

export const RATES_POLL_INTERVAL = 10 * 10000;

export enum ROUTES {
  home = '/',
  exchange = '/exchange',
}
