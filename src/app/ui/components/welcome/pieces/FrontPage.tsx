import { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { AccordionItem } from './AccordionItem';
import { GenericContainer } from '../../../layouts/GenericContainer';
import { H1, P2 } from '../../../../ui/elements/font';
import { fade } from '../../../../ui/styles/keyframes';
import { breakpoints } from '../../../../ui/styles/maps/breakpoints';

export const FrontPage = ({
  frontPageContent,
  $visible,
}: {
  frontPageContent: {
    pretitle: string;
    title: string;
    elements: {
      subtitle: string;
      paragraphs: string[];
    }[];
  };
  $visible: boolean;
}): ReactElement => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number): void => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <StyledFrontPage $visible={$visible}>
      <P2FrontPage>{frontPageContent.pretitle}</P2FrontPage>
      <H1FrontPage>{frontPageContent.title}</H1FrontPage>
      {frontPageContent.elements.map((element, index) => (
        <AccordionItem
          key={index}
          subtitle={element.subtitle}
          paragraphs={element.paragraphs}
          isOpen={activeIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </StyledFrontPage>
  );
};

const StyledFrontPage = styled(GenericContainer)<{ $visible: boolean }>`
  align-items: flex-start;
  width: fit-content;
  height: fit-content;

  animation: ${({ $visible }) => ($visible ? fade.fadeIn : fade.fadeOut)}
    ${({ theme }) => theme.animation.duration.slower}
    ${({ theme }) => theme.animation.easing.default} both;

  @media (${breakpoints.mobile}) {
    display: none;
  }
`;

const H1FrontPage = styled(H1)`
  margin-bottom: 2.5rem;
`;

const P2FrontPage = styled(P2)`
  padding-bottom: 0.5rem;
`;
