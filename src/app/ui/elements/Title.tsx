import { ReactElement } from 'react';
import styled from 'styled-components';

export const Title = ({
  textTitle,
}: {
  textTitle: string;
  heightTitle: number;
}): ReactElement => {
  return (
    <StyledTitle>
      <h1 className="myTitle">{textTitle}</h1>
      <h2 className="mySubtitle">
        Please fill-up this form to be able to use CryptoMessage.
      </h2>
    </StyledTitle>
  );
};

const StyledTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 20rem;

  padding-bottom: 0.5rem;

  .myTitle {
    font-size: 1.6rem;
    font-weight: bold;
    margin: 0;
    text-align: center;
    padding-bottom: 1.5rem;
  }
  .mySubtitle {
    font-size: 1rem;
    font-weight: 400;
    margin: 0;
    text-align: center;
  }
`;
