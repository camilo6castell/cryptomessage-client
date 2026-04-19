import { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { Button } from './Button';

export const CopyToClipboardButton = ({
  textToCopy,
  textButton,
  className,
}: {
  textToCopy: string;
  textButton: string;
  className?: string;
}): ReactElement => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Error copiando al portapapeles:', error);
    }
  };

  return (
    <StyledButton
      textButton={copied ? '¡Copiado!' : textButton}
      onClick={handleCopy}
      disabled={copied}
      className={className}
    />
  );
};

const StyledButton = styled(Button)`
  &:active {
    transform: scale(0.98);
  }
`;
