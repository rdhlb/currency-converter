import styled from 'styled-components';
import { floorToDecimals } from '../../utils';

type Props = {
  onChange: (value: number) => void;
  value: number;
  autofocus?: boolean;
};

export const ConverterInput: React.FC<Props> = ({ onChange, value, autofocus = false }) => {
  const handleValueChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { valueAsNumber },
  }) => {
    if (Number.isNaN(valueAsNumber)) {
      onChange(0);
    } else {
      onChange(floorToDecimals(valueAsNumber < 0 ? -valueAsNumber : valueAsNumber));
    }
  };

  const valueToRender = value === 0 ? '' : value;

  return (
    <div>
      <Input
        type="number"
        value={valueToRender}
        step="0.01"
        onChange={handleValueChange}
        autoFocus={autofocus}
      />
    </div>
  );
};

const Input = styled.input`
  -webkit-appearance: none;
  margin: 0;
  background-color: transparent;
  width: 9rem;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.23);
  border: 3px solid white;
  color: white;
`;
