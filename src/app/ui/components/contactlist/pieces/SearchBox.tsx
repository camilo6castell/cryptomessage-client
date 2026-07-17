import { ReactElement } from 'react';
import styled from 'styled-components';
import { RiSearchLine } from 'react-icons/ri';

export const SearchBox = ({
  handleSearchContactSubmit,
  handleInput,
  value,
}: {
  handleSearchContactSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void | Promise<void>;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}): ReactElement => {
  return (
    <StyledSearchBox
      onSubmit={(event) => {
        void handleSearchContactSubmit(event);
      }}
    >
      <RiSearchLine size={16} />
      <input
        type="text"
        placeholder="usuario"
        onChange={handleInput}
        value={value}
        id="username"
        name="username"
        autoComplete="off"
      />
      <button type="submit">Buscar</button>
    </StyledSearchBox>
  );
};

const StyledSearchBox = styled.form`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  width: 100%;
  max-width: 24rem;

  padding: 0.55rem 0.6rem 0.55rem 1rem;
  border-radius: 1.5rem;

  background-color: ${({ theme }) => theme.surface.surfaceRaised};
  border: 1px solid ${({ theme }) => theme.surface.borderSubtle};
  color: ${({ theme }) => theme.surface.textMuted};

  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: ${({ theme }) => theme.surface.textPrimary};
    font-size: 0.9rem;

    &::placeholder {
      color: ${({ theme }) => theme.surface.textMuted};
    }
  }

  button {
    flex-shrink: 0;
    border: none;
    padding: 0.45rem 1rem;
    border-radius: 1.2rem;

    font-size: 0.8rem;
    font-weight: 600;
    color: #15121c;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.color.highlight} 0%,
      ${({ theme }) => theme.color.highlightDeep} 100%
    );

    cursor: pointer;
    transition: filter 0.2s ease;

    &:hover {
      filter: brightness(1.05);
    }
  }
`;
