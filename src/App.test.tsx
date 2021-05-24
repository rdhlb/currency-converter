import { MockedResponse } from '@apollo/client/testing';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';
import App from './App';
import { CurrencyCode } from './constants';
import { GET_LATEST_RATES } from './operations/queries/getLatestRates';
import { render } from './testUtils';

jest.mock('./constants', () => {
  const constants = jest.requireActual('./constants');
  return {
    ...constants,
    RATES_POLL_INTERVAL: 0,
  };
});

const graphQLMock: MockedResponse = {
  request: {
    query: GET_LATEST_RATES,
    variables: { baseCurrency: CurrencyCode.USD, quoteCurrency: CurrencyCode.EUR },
  },
  result: {
    data: {
      latest: [{ quote: 0.819556, baseCurrency: 'USD', quoteCurrency: 'EUR', __typename: 'Rate' }],
    },
  },
};

describe('Whole App', () => {
  test('sets active account as base for exchange and navigates to exchange screen', async () => {
    render(<App />, { graphQLMocks: [graphQLMock] });

    const EURBalance = /200.34 EUR/i;
    const USDBalance = /100.23 USD/i;

    // Default account is USD
    expect(screen.getAllByText(USDBalance)?.[0]).toBeVisible();

    await selectEvent.select(screen.getByLabelText(/Select an account:/i), [EURBalance]);

    // Switched to EUR account
    expect(screen.getAllByText(EURBalance)?.[0]).toBeVisible();

    const exchangeLink = screen.getByRole('link', { name: /exchange/i });

    const leftClick = { button: 0 };
    userEvent.click(exchangeLink, leftClick);

    await waitFor(() => {
      expect(screen.getByTestId('base-account-balance').textContent).toBe('You have 200.34 EUR');
      expect(screen.getByRole('button', { name: /exchange/i })).toBeVisible();
    });
  });
});
