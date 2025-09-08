import { ReactElement } from 'react';
import styled from 'styled-components';
import { IReactElementChildrenProps } from '../../../core/models/reactElementChildren.model.ts';

export const MainBar = ({
  children,
}: IReactElementChildrenProps): ReactElement => {
  return <StyledMainBar>{children}</StyledMainBar>;
};

const StyledMainBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: var(--height-mainbar);

  padding: 0.5rem 1rem;

  background-color: var(--main-background-color);
  z-index: 1;

  /* border: 1px solid white; */
  box-shadow: 0px 0px 2px 2px var(--aux-background-color);

  transition: all 1s ease-in-out;
`;

// import { ReactElement, ReactNode } from 'react';
// import styled from 'styled-components';
// import { IReactElementChildrenProps } from '../../../core/models/reactElementChildren.model.ts';

// export const MainBar = ({
//   isShown,
//   children,
// }: {
//   isShown: boolean;
//   children: ReactNode;
// }): ReactElement => {
//   return <StyledMainBar>{children}</StyledMainBar>;
// };

// const StyledMainBar = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;

//   width: 100%;
//   /* height: var(--height-mainbar); */
//   display: none;
//   padding: 0.5rem 1rem;

//   background-color: var(--component-background-color);
//   z-index: 1;

//   /* border: 1px solid white; */
//   box-shadow: 0px 0px 2px 2px var(--component-background-color);

//   transition: all 1s ease-in-out;
// `;
