import styled from 'styled-components';

export const ExchangeButton = styled.button`
  display: block;
  font-size: 24px;
  padding: 10px;
  line-height: 1;
  border: 0;
  border-radius: 2px;
  cursor: pointer;
  color: #0066eb;
  text-transform: uppercase;

  :disabled {
    cursor: initial;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InputsContainer = styled.div`
  display: flex;
  min-width: 300px;
`;

export const SelectContainer = styled.div`
  min-width: 150px;
  margin-right: 10px;
`;

export const Account = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AccountsSeparator = styled.div`
  width: 100%;
  height: 2px;
  background-color: white;
`;

export const ExtraInfo = styled.div`
  margin-top: 10px;
  color: white;
  font-size: 20px;
`;

export const Loading = styled.span`
  color: white;
`;
