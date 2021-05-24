import Select, { StylesConfig } from 'react-select';

import { CurrencyCode, ROUTES } from '../../constants';
import { AccountsByCurrency } from '../../hooks/useAccountsReducer';
import { Container, Amount, ExchangeLink } from './balance.styled';

const selectStyles: StylesConfig<OptionType, false> = {
  container: (provided) => ({
    ...provided,
    minWidth: 200,
    width: '30%',
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
  // TODO: memo
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
