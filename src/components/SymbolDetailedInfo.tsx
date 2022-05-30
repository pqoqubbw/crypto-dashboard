import React from 'react';
import { Box } from '@chakra-ui/react';

import { formatCurrency, formatDate } from '../utils';
import type { Symbols } from '../context';

const SymbolDetailedInfo = ({
  data_quote_end,
  name,
  price,
}: Partial<Omit<Symbols, 'symbol_id'>>) => {
  return (
    <Box
      width="full"
      borderWidth="1px"
      borderRadius="lg"
      marginBottom="10"
      p="6"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      marginTop="5"
    >
      <Box>{name || 'N/A'}</Box>
      <Box>{formatCurrency(price || 0.0)}</Box>
      <Box>{data_quote_end ? formatDate(data_quote_end) : 'N/A'}</Box>
    </Box>
  );
};

export { SymbolDetailedInfo };
