import { CurrencyCode, CURRENCY_SYMBOLS } from './constants';

export const roundToDecimals = (value: number, decimals = 2) =>
  Number(`${Math.round(Number(`${value}e${decimals}`))}e-${decimals}`);

export const floorToDecimals = (value: number, decimals = 2) =>
  Number(`${Math.floor(Number(`${value}e${decimals}`))}e-${decimals}`);

export const getCurrencySymbol = (currencyCode: CurrencyCode) => CURRENCY_SYMBOLS[currencyCode];
