import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ExchangeLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: white;
  font-size: 24px;
  padding: 0.3em 1em 0.4em;
  line-height: 1;
  border: 1px solid white;
  border-radius: 2px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100%;
`;

export const Amount = styled.div`
  font-size: 36px;
  color: white;
  font-weight: 500;
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;

export const SelectLabel = styled.label`
  color: white;
  font-size: 20px;
`;
