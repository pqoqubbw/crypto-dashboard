import React from 'react';
import { Select } from '@chakra-ui/react';

import { useFetchContext } from '../context';

const SelectSymbols = () => {
  const { symbolsList, setSelectedValue, optionsSelectLoading } =
    useFetchContext();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(
      symbolsList.find((item) => item.symbol_id === event.target.value) || null
    );
  };
  return (
    <Select
      size="lg"
      variant="filled"
      width="sm"
      placeholder="Select symbols..."
      isDisabled={!symbolsList.length || optionsSelectLoading}
      onChange={handleSelectChange}
    >
      {symbolsList &&
        symbolsList.map((el) => (
          <option key={el.symbol_id} value={el.symbol_id} label={el.name} />
        ))}
    </Select>
  );
};

export { SelectSymbols };
