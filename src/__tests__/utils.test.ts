import { CurrencyCode } from '../constants';
import { roundToDecimals, floorToDecimals, getCurrencySymbol } from '../utils';

describe('Utils', () => {
  test('getCurrencySymbol returns $ for USD', () => {
    expect(getCurrencySymbol(CurrencyCode.USD)).toStrictEqual('$');
  });

  test('roundToDecimals returns 9.97 for 9.966', () => {
    expect(roundToDecimals(9.966)).toStrictEqual(9.97);
  });

  test('roundToDecimals returns 9.96 for 9.963', () => {
    expect(roundToDecimals(9.963)).toStrictEqual(9.96);
  });

  test('floorToDecimals returns 9.96 for 9.966', () => {
    expect(floorToDecimals(9.966)).toStrictEqual(9.96);
  });
});
