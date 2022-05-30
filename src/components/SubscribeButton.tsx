import React from 'react';
import { Button, ButtonProps, Flex, Text } from '@chakra-ui/react';

type Props = Required<
  Pick<ButtonProps, 'isLoading' | 'disabled' | 'onClick' | 'children'>
>;

const SubscribeButton = ({
  children,
  disabled,
  isLoading,
  onClick,
  ...props
}: Props) => {
  return (
    <Flex direction="column" gap={1}>
      <Text fontSize="small">Prices update every 1 minute</Text>
      <Button
        size="lg"
        paddingLeft="20"
        paddingRight="20"
        variant="outline"
        colorScheme="facebook"
        isLoading={isLoading}
        loadingText="Submitting"
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {children}
      </Button>
    </Flex>
  );
};

export { SubscribeButton };
