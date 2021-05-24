export const roundToDecimals = (value: number, decimals = 2) =>
  Number(`${Math.round(Number(`${value}e${decimals}`))}e-${decimals}`);

export const floorToDecimals = (value: number, decimals = 2) =>
  Number(`${Math.floor(Number(`${value}e${decimals}`))}e-${decimals}`);
