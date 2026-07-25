import { ReactElement } from 'react';
import styled from 'styled-components';

type IllustrationType =
  'no-chats' | 'no-contacts' | 'no-messages' | 'search-empty' | 'select-chat';

const illustrations: Record<IllustrationType, string> = {
  'no-chats': `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="25" width="90" height="65" rx="12" stroke="currentColor" stroke-width="2" opacity="0.3"/>
    <path d="M35 50h50M35 62h35" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.2"/>
    <circle cx="90" cy="85" r="18" fill="currentColor" opacity="0.08"/>
    <path d="M85 85h10M90 80v10" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.25"/>
  </svg>`,
  'no-contacts': `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="42" r="16" stroke="currentColor" stroke-width="2" opacity="0.3"/>
    <path d="M25 85c0-13.8 11.2-25 25-25s25 11.2 25 25" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.2"/>
    <circle cx="88" cy="82" r="14" stroke="currentColor" stroke-width="2" opacity="0.15"/>
    <path d="M98 82h-20" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.2"/>
  </svg>`,
  'no-messages': `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="20" width="80" height="60" rx="8" stroke="currentColor" stroke-width="2" opacity="0.2"/>
    <path d="M40 90l15-10h-15z" fill="currentColor" opacity="0.1"/>
    <rect x="35" y="35" width="50" height="3" rx="1.5" fill="currentColor" opacity="0.1"/>
    <rect x="35" y="45" width="35" height="3" rx="1.5" fill="currentColor" opacity="0.08"/>
  </svg>`,
  'search-empty': `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="22" stroke="currentColor" stroke-width="2" opacity="0.3"/>
    <path d="M66 66l18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.25"/>
    <path d="M42 50h16M50 42v16" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.15"/>
  </svg>`,
  'select-chat': `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="20" width="80" height="60" rx="10" stroke="currentColor" stroke-width="2" opacity="0.2"/>
    <path d="M55 50l15 10-15 10z" fill="currentColor" opacity="0.1"/>
    <circle cx="60" cy="50" r="20" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.15"/>
  </svg>`,
};

export const EmptyStateIllustration = ({
  type,
  size = 100,
}: {
  type: IllustrationType;
  size?: number;
}): ReactElement => (
  <StyledIllustration
    $size={size}
    dangerouslySetInnerHTML={{ __html: illustrations[type] }}
  />
);

const StyledIllustration = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  color: ${({ theme }) => theme.surface.textMuted};
  opacity: 0.7;
  margin-bottom: 0.5rem;

  svg {
    width: 100%;
    height: 100%;
  }
`;
