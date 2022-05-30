import React from 'react';
import { Container, Flex, Text } from '@chakra-ui/react';

import {
  DetailedChart,
  SelectSymbols,
  SubscribeButton,
  SymbolDetailedInfo,
} from './components';
import { useFetchContext } from './context';

const App = () => {
  const {
    selectedValue,
    isSubscribed,
    toggleSubscribeClick,
    chartInfoLoading,
    detailedSymbolsInfo,
  } = useFetchContext();

  return (
    <Container centerContent maxW="container.lg" marginTop="20">
      <Flex align="center" justifyContent="space-between" width="full">
        <SelectSymbols />
        <SubscribeButton
          onClick={toggleSubscribeClick}
          disabled={!selectedValue}
          isLoading={chartInfoLoading && detailedSymbolsInfo}
        >
          {!isSubscribed ? 'Subscribe' : 'Unsubscribe'}
        </SubscribeButton>
      </Flex>
      <SymbolDetailedInfo {...selectedValue} />
      {selectedValue ? (
        <DetailedChart />
      ) : (
        <Text width="full">Select any symbol to see prices chart</Text>
      )}
    </Container>
  );
};

export { App };
