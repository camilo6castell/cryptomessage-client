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

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 2.5rem;
  }
  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  h3 {
    padding-bottom: 0.5rem;
  }
  p {
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 1rem;
    line-height: 1.5;
  }
`;
