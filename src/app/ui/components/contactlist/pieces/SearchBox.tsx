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

  background-color: ${({ theme }) => theme.surface.surfaceInput};
  border: 1px solid ${({ theme }) => theme.surface.borderSubtle};
  color: ${({ theme }) => theme.surface.textMuted};
  transition: border-color 0.2s ${({ theme }) => theme.animation.easing.default};

  &:focus-within {
    border-color: ${({ theme }) => theme.surface.borderFocus};
  }

  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: ${({ theme }) => theme.surface.textPrimary};
    font-size: ${({ theme }) => theme.typography.fontSize.md};

    &::placeholder {
      color: ${({ theme }) => theme.surface.textMuted};
    }
  }

  button {
    flex-shrink: 0;
    border: none;
    padding: 0.45rem 1rem;
    border-radius: 1.2rem;

    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: #15121c;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.color.highlight} 0%,
      ${({ theme }) => theme.color.highlightDeep} 100%
    );

    cursor: pointer;
    transition:
      filter 0.2s ${({ theme }) => theme.animation.easing.default},
      box-shadow 0.2s ${({ theme }) => theme.animation.easing.default};

    &:hover {
      filter: brightness(1.08);
      box-shadow: 0 2px 8px ${({ theme }) => theme.color.highlightTint20};
    }
  }
`;
