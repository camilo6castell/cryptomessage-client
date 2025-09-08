import { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { AccordionItem } from './AccordionItem';

export const FrontPage = ({
  frontPageContent,
}: {
  frontPageContent: {
    pretitle: string;
    title: string;
    elements: {
      subtitle: string;
      paragraphs: string[];
    }[];
  };
}): ReactElement => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number): void => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <StyledFrontPage>
      <h3>{frontPageContent.pretitle}</h3>
      <h1>{frontPageContent.title}</h1>
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

const StyledFrontPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */

  width: 100%;
  height: 100%;

  transition: all 1s ease-in-out;

  h3 {
    padding-bottom: 0.5rem;
  }
`;
