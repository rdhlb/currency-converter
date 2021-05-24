import { MockedResponse } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import { CurrencyCode } from '../../../constants';
import { GET_LATEST_RATES } from '../../../operations/queries/getLatestRates';
import { render, screen, waitFor } from '../../../testUtils';
import { Converter } from '../converter';

jest.mock('../../../constants', () => {
  const constants = jest.requireActual('../../../constants');
  return {
    ...constants,
    RATES_POLL_INTERVAL: 0,
  };
});

const QUOTE_RATE_MOCK = 0.819556;

const graphQLMocks: MockedResponse[] = [
  {
    request: {
      query: GET_LATEST_RATES,
      variables: { baseCurrency: CurrencyCode.USD, quoteCurrency: CurrencyCode.EUR },
    },
    result: {
      data: {
        latest: [
          { quote: QUOTE_RATE_MOCK, baseCurrency: 'USD', quoteCurrency: 'EUR', __typename: 'Rate' },
        ],
      },
    },
  },
];

const mockAccounts = {
  [CurrencyCode.USD]: {
    amount: 100.23,
  },
  [CurrencyCode.EUR]: {
    amount: 200.34,
  },
  [CurrencyCode.GBP]: {
    amount: 300.45,
  },
};

describe('Converter', () => {
  const setup = async () => {
    const exchangeMock = jest.fn();

    render(
      <Converter
        activeAccount={CurrencyCode.USD}
        exchange={exchangeMock}
        accounts={mockAccounts}
      />,
      { graphQLMocks },
    );

    // waiting for rates to load
    await waitFor(() => {
      expect(screen.getByText('You have 100.23 USD')).toBeVisible();
      expect(screen.getByText('You have 200.34 EUR')).toBeVisible();
    });

    const fromInput = screen.getByPlaceholderText(/from/i) as HTMLInputElement;
    const toInput = screen.getByPlaceholderText(/to/i) as HTMLInputElement;

    return { fromInput, toInput, exchangeMock };
  };

  test('inputs accept only numbers with two digits after the dot', async () => {
    const { fromInput: input } = await setup();

    userEvent.type(input, '3432.2323');

    expect(input.value).toBe('3432.23');
  });

  test('inputs do not allow letters to be inputted', async () => {
    const { fromInput: input } = await setup();

    expect(input.value).toBe('');

    userEvent.type(input, 'Hello R!');

    expect(input.value).toBe('');
  });

  test('renders correct rates', async () => {
    await setup();

    expect(screen.getByText('1 USD = 0.82 EUR')).toBeVisible();
    expect(screen.getByText('1 EUR = 1.22 USD')).toBeVisible();
  });

  test('converts from base to quote using quoteRate', async () => {
    const { fromInput, toInput } = await setup();

    userEvent.type(fromInput, '1');

    expect(toInput.value).toBe('0.82');
  });

  test('converts from quote to base using quoteRate', async () => {
    const { fromInput, toInput } = await setup();

    userEvent.type(toInput, '1');

    expect(fromInput.value).toBe('1.22');
  });

  test('calls exchange method on Exchange button click ONLY if input values satisfy validation', async () => {
    const { fromInput, exchangeMock } = await setup();

    const exchangeButton = screen.getByRole('button', { name: /exchange/i });

    expect(exchangeButton).toBeDisabled();

    userEvent.type(fromInput, '1');

    expect(exchangeButton).toBeEnabled();
    userEvent.click(exchangeButton, { button: 0 });
    // TODO: check payload
    expect(exchangeMock).toHaveBeenCalled();
  });
});
