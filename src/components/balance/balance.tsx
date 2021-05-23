import Select, { StylesConfig } from 'react-select';

import { AccountsByCurrency } from '../../App';
import { CurrencyCode, ROUTES } from '../../constants';
import { Container, Amount, ExchangeLink } from './balance.styled';

const selectStyles: StylesConfig<OptionType, false> = {
  container: (provided) => ({
    ...provided,
    width: '20%',
  }),
};

type OptionType = {
  label: string;
  value: string;
};

type Props = {
  activeAccount: CurrencyCode;
  accounts: AccountsByCurrency;
  setActiveAccount: (value: CurrencyCode) => void;
};

export const Balance: React.FC<Props> = ({ activeAccount, accounts, setActiveAccount }) => {
  // TODO: DRY
  const activeAmount = `${accounts[activeAccount]?.amount} ${activeAccount}`;
  // TODO: useMemo
  const accountsOptions: OptionType[] = Object.entries(accounts).map(
    ([currencyKey, accountData]) => ({
      value: currencyKey,
      label: `${accountData?.amount} ${currencyKey}`,
    }),
  );

  return (
    <Container>
      <Amount>{activeAmount}</Amount>
      <Select
        defaultValue={{ value: activeAccount, label: activeAmount }}
        options={accountsOptions}
        placeholder="Select Account"
        onChange={(selected) => setActiveAccount(selected?.value as CurrencyCode)}
        styles={selectStyles}
        isSearchable={false}
      />
      <ExchangeLink to={ROUTES.exchange}>Exchange</ExchangeLink>
    </Container>
  );
};
