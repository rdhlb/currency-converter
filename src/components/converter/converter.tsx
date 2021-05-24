import { useEffect } from 'react';
import { useHistory } from 'react-router';
import Select from 'react-select';

import { CurrencyCode, CURRENCY_SYMBOLS, ROUTES } from '../../constants';
import { AccountsByCurrency, TransactionData } from '../../hooks/useAccountsReducer';
import { useConverterReducer } from '../../hooks/useConverterReducer';
import { useGetLatestRates } from '../../operations/queries/useGetLatestRates';
import { floorToDecimals, roundToDecimals } from '../../utils';
import {
  ExchangeButton,
  Container,
  InputsContainer,
  SelectContainer,
  Account,
  AccountsSeparator,
  ExtraInfo,
  Loading,
} from './converter.styled';
import { ConverterInput } from './converterInput';

type Props = {
  activeAccount: CurrencyCode;
  accounts: AccountsByCurrency;
  exchange: (from: TransactionData, to: TransactionData) => void;
};

type OptionType = {
  label: string;
  value: string;
};

export const Converter: React.FC<Props> = ({ activeAccount, accounts, exchange }) => {
  const history = useHistory();
  const accountsList = Object.keys(accounts) as CurrencyCode[];
  const accountsOptions: OptionType[] = accountsList.map((account) => ({
    label: `${account} - ${CURRENCY_SYMBOLS[account]}`,
    value: account,
  }));
  const defaultQuoteCurrency = accountsList.filter((account) => account !== activeAccount)[0];

  const {
    base,
    quote,
    setBaseValue,
    setQuoteValue,
    setBaseCurrency,
    setQuoteCurrency,
    recalcQuoteValue,
  } = useConverterReducer({
    baseCurrency: activeAccount,
    quoteCurrency: defaultQuoteCurrency,
  });

  const baseAccountFunds = accounts[base.currency]?.amount || 0;
  const quoteAccountFunds = accounts[quote.currency]?.amount || 0;

  const { quoteRate, loading, error } = useGetLatestRates({
    baseCurrency: base.currency,
    quoteCurrency: quote.currency,
  });

  // watch for quote rate changes
  useEffect(() => {
    if (quoteRate) {
      recalcQuoteValue(quoteRate);
    }
  }, [quoteRate, recalcQuoteValue]);

  if (loading)
    return (
      <Container>
        <Loading>Loading...</Loading>
      </Container>
    );
  if (error) return <Container>Error :( {error.message}</Container>;

  const handleBaseValueChange = (value: number) => {
    setBaseValue(value, quoteRate);
  };

  const handleQuoteValueChange = (value: number) => {
    setQuoteValue(value, quoteRate);
  };

  const handleExchange = () => {
    exchange(
      { account: base.currency, newAmount: floorToDecimals(baseAccountFunds - base.value) },
      { account: quote.currency, newAmount: floorToDecimals(quoteAccountFunds + quote.value) },
    );
    history.push(ROUTES.home);
  };

  const isExchangeAllowed = base.currency !== quote.currency && base.value > 0 && quote.value > 0;

  return (
    <Container>
      <Account>
        <InputsContainer>
          <SelectContainer>
            <Select
              defaultValue={
                {
                  value: base.currency,
                  label: `${base.currency} - ${CURRENCY_SYMBOLS[base.currency]}`,
                } as OptionType
              }
              options={accountsOptions}
              onChange={(selected) => setBaseCurrency(selected?.value as CurrencyCode)}
              isSearchable={false}
            />
          </SelectContainer>
          <ConverterInput
            value={base.value}
            onChange={handleBaseValueChange}
            autofocus
            placeholder="From"
          />
        </InputsContainer>
        <ExtraInfo data-testid="base-account-balance">
          You have {roundToDecimals(baseAccountFunds)} {base.currency}
        </ExtraInfo>
        <ExtraInfo>
          1 {base.currency} = {roundToDecimals(quoteRate)} {quote.currency}
        </ExtraInfo>
      </Account>
      <AccountsSeparator />
      <Account>
        <InputsContainer>
          <SelectContainer>
            <Select
              defaultValue={
                {
                  value: quote.currency,
                  label: `${quote.currency} - ${CURRENCY_SYMBOLS[quote.currency]}`,
                } as OptionType
              }
              options={accountsOptions}
              onChange={(selected) => setQuoteCurrency(selected?.value as CurrencyCode)}
              isSearchable={false}
            />
          </SelectContainer>
          <ConverterInput value={quote.value} onChange={handleQuoteValueChange} placeholder="To" />
        </InputsContainer>
        <ExtraInfo>
          You have {roundToDecimals(quoteAccountFunds)} {quote.currency}
        </ExtraInfo>
        <ExtraInfo>
          1 {quote.currency} = {roundToDecimals(1 / quoteRate)} {base.currency}
        </ExtraInfo>
      </Account>
      <ExchangeButton disabled={!isExchangeAllowed} onClick={handleExchange}>
        Exchange
      </ExchangeButton>
    </Container>
  );
};
