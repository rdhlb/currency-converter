import { AccountsByCurrency } from '../../App';
import { CurrencyCode } from '../../constants';
import { useConverterReducer } from '../../hooks/useConverterReducer';
import { useGetLatestRates } from '../../operations/queries/useGetLatestRates';
import { Input, ExchangeButton, Container } from './converter.styled';

type Props = {
  activeAccount: CurrencyCode;
  accounts: AccountsByCurrency;
};

export const Converter: React.FC<Props> = ({ activeAccount, accounts }) => {
  const defaultQuoteCurrency = Object.keys(accounts).filter(
    (account) => account !== activeAccount,
  )[0] as CurrencyCode;

  const { base, quote, setBaseValue, setQuoteValue } = useConverterReducer({
    baseCurrency: activeAccount,
    quoteCurrency: defaultQuoteCurrency,
  });

  const { quoteRate, loading, error } = useGetLatestRates({
    baseCurrency: base.currency,
    quoteCurrency: quote.currency,
  });

  if (error) return <p>Error :(</p>;

  const handleBaseValueChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    const newValue = parseFloat(value);
    setBaseValue(newValue, quoteRate);
  };

  const handleQuoteValueChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    const newValue = parseFloat(value);
    setQuoteValue(newValue, quoteRate);
  };

  return (
    <Container>
      <div>{base.currency}</div>
      <Input onChange={handleBaseValueChange} value={base.value} disabled={loading} />
      <div>
        You have {accounts[base.currency]?.amount} {base.currency}
      </div>
      <div>
        1 {base.currency} = {quoteRate} {quote.currency}
      </div>
      <hr />
      <div>{quote.currency}</div>
      <Input onChange={handleQuoteValueChange} value={quote.value} disabled={loading} />
      <div>
        You have {accounts[quote.currency]?.amount} {quote.currency}
      </div>
      <div>
        1 {quote.currency} = {1 / quoteRate} {base.currency}
      </div>
      <ExchangeButton>Exchange</ExchangeButton>
    </Container>
  );
};
