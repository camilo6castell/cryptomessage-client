import { ReactElement } from 'react';
import styled from 'styled-components';

export const SearchBox = ({
  handleSearchContactSubmit,
  handleInput,
  value,
}: {
  handleSearchContactSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}): ReactElement => {
  return (
    <StyledSearchBox onSubmit={handleSearchContactSubmit}>
      <input
        type="text"
        onChange={handleInput}
        value={value}
        id="username"
        name="username"
      />
      <button type="submit"> buscar</button>
    </StyledSearchBox>
  );
};

const StyledSearchBox = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;
