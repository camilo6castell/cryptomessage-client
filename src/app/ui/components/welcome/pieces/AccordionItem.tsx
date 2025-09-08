import { ReactElement } from 'react';
import styled from 'styled-components';

interface AccordionItemProps {
  subtitle: string;
  paragraphs: string[];
  isOpen: boolean;
  onToggle: () => void;
}

export const AccordionItem = ({
  subtitle,
  paragraphs,
  isOpen,
  onToggle,
}: AccordionItemProps): ReactElement => {
  return (
    <StyledAccordionItem
      $isOpen={isOpen}
      id={subtitle.toLowerCase().replace(/ /g, '-')}
    >
      <div className="title">
        <a
          href={`#${subtitle.toLowerCase().replace(/ /g, '-')}`}
          onClick={(e) => {
            e.preventDefault();
            onToggle();
          }}
        >
          {subtitle}
        </a>
      </div>
      <div className="content">
        <div className="wrapper">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </StyledAccordionItem>
  );
};

interface StyledAccordionItemProps {
  $isOpen: boolean;
}

const StyledAccordionItem = styled.section<StyledAccordionItemProps>`
  color: #ffffff;
  background-color: #8c7c68;
  /* max-width: 56ch; */
  margin-bottom: 1rem;
  border-radius: 8px;
  display: grid;
  grid-template-rows: ${({ $isOpen }): string =>
    $isOpen ? '0fr 1fr' : '0fr 0fr'};
  transition: grid-template-rows 400ms ease, box-shadow 200ms;

  &:not(:target):hover {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
  }

  .title {
    font-size: 1.25rem;
    font-weight: 800;
    color: currentColor;
    display: flex;
    align-items: center;

    a {
      padding: 1rem 1.25rem;
      text-decoration: none;
      color: inherit;
      display: flex;
      align-items: center;
      transition: transform 400ms ease;

      &::before {
        content: '';
        display: inline-block;
        margin-right: 0.75rem;
        width: 0.65rem;
        height: 0.65rem;
        background-color: currentColor;
        mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='white' d='M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z'/%3E%3C/svg%3E");
        mask-size: 100% 100%;
        transform: ${({ $isOpen }): string =>
          $isOpen ? 'rotate(90deg)' : 'rotate(0deg)'};
      }
    }
  }

  .content {
    overflow: hidden;
    transition: max-height 400ms ease;
    max-height: ${({ $isOpen }): string => ($isOpen ? '1000px' : '0')};
    font-size: 1rem;
    line-height: 1.4;
    padding: ${({ $isOpen }): string =>
      $isOpen ? '1.05rem 1.25rem' : '0 1.25rem'};
    box-sizing: border-box;

    .wrapper {
      p {
        margin-bottom: 1rem;
      }
      p:last-of-type {
        margin-bottom: 0;
      }
    }
  }
`;
