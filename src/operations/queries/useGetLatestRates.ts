import { useQuery } from '@apollo/client';

import { CurrencyCode, RATES_POLL_INTERVAL } from '../../constants';
import { GET_LATEST_RATES } from './getLatestRates';
import { getLatestRates, getLatestRatesVariables } from './__generated__/getLatestRates';

type Props = {
  baseCurrency: CurrencyCode;
  quoteCurrency: CurrencyCode;
};

export const useGetLatestRates = ({ baseCurrency, quoteCurrency }: Props) => {
  const { loading, error, data } = useQuery<getLatestRates, getLatestRatesVariables>(
    GET_LATEST_RATES,
    {
      variables: { baseCurrency, quoteCurrency },
      pollInterval: RATES_POLL_INTERVAL,
    },
  );

  const quoteRate = data?.latest?.[0].quote;

  return { quoteRate, loading, error };
};
