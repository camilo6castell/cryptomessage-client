import { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import { shimmer } from '../styles/keyframes';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  className?: string;
}

export const Skeleton = ({
  width,
  height,
  borderRadius,
  variant = 'text',
  className,
}: SkeletonProps): ReactElement => {
  return (
    <StyledSkeleton
      $width={width}
      $height={height}
      $borderRadius={borderRadius}
      $variant={variant}
      className={className}
    />
  );
};

const variantStyles = {
  text: css`
    height: 0.9rem;
    border-radius: 0.35rem;
  `,
  circular: css`
    border-radius: 50%;
  `,
  rectangular: css`
    border-radius: 0.75rem;
  `,
};

const StyledSkeleton = styled.div<{
  $width?: string;
  $height?: string;
  $borderRadius?: string;
  $variant: 'text' | 'circular' | 'rectangular';
}>`
  ${({ $variant }) => variantStyles[$variant]}
  width: ${({ $width }) => $width ?? '100%'};
  height: ${({ $height }) => $height};
  border-radius: ${({ $borderRadius }) => $borderRadius};

  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.surface.surfaceRaised} 25%,
    ${({ theme }) => theme.surface.interactiveHover} 50%,
    ${({ theme }) => theme.surface.surfaceRaised} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
`;

export const ChatCardSkeleton = (): ReactElement => (
  <StyledSkeletonRow>
    <Skeleton variant="circular" width="2.75rem" height="2.75rem" />
    <StyledSkeletonLines>
      <Skeleton width="55%" height="0.85rem" />
      <Skeleton width="40%" height="0.7rem" />
    </StyledSkeletonLines>
  </StyledSkeletonRow>
);

export const ContactItemSkeleton = (): ReactElement => (
  <StyledSkeletonRow>
    <Skeleton variant="circular" width="2.5rem" height="2.5rem" />
    <StyledSkeletonLines>
      <Skeleton width="50%" height="0.85rem" />
      <Skeleton width="30%" height="0.7rem" />
    </StyledSkeletonLines>
  </StyledSkeletonRow>
);

export const MessageBubbleSkeleton = ({
  isSent,
}: {
  isSent: boolean;
}): ReactElement => (
  <StyledSkeletonBubble $isSent={isSent}>
    <Skeleton width="12rem" height="2.5rem" borderRadius="1.1rem" />
  </StyledSkeletonBubble>
);

const StyledSkeletonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.75rem;
  margin-bottom: 0.4rem;
`;

const StyledSkeletonLines = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
`;

const StyledSkeletonBubble = styled.div<{ $isSent: boolean }>`
  display: flex;
  justify-content: ${({ $isSent }) => ($isSent ? 'flex-end' : 'flex-start')};
  margin-bottom: 0.7rem;
`;
