import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useAxios } from '../hooks/useAxios';

import type { FetchDetailedData, FetchSymbols } from '../@types';

export interface Symbols
  extends Pick<FetchSymbols, 'symbol_id' | 'price' | 'data_quote_end'> {
  name: string;
}

interface Context {
  symbolsList: Symbols[];
  selectedValue: Symbols | null;
  chartInfo: ChartInfo[];
  isSubscribed: boolean;
  optionsSelectLoading: boolean;
  detailedSymbolsInfo: boolean;
  chartInfoLoading: boolean;
  toggleSubscribeClick: () => void;
  setSelectedValue: React.Dispatch<React.SetStateAction<Symbols | null>>;
}

const FetchContext = createContext<Context>({} as Context);

interface ChartInfo {
  time: string;
  price: number;
}

interface Props {
  children: React.ReactNode;
}

const MINUTE_IN_MILLISECONDS = 60 * 1000;

const FetchProvider = ({ children }: Props) => {
  const [symbolsList, setSymbolsList] = useState<Symbols[]>([]);
  const [selectedValue, setSelectedValue] = useState<Symbols | null>(null);
  const [chartInfo, setChartInfo] = useState<ChartInfo[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const [optionsSelectLoading, getAllSelectOptions] = useAxios<FetchSymbols[]>({
    url: 'symbols?filter_exchange_id=BINANCE&filter_symbol_id=USD',
    onSuccess: (fetchResponse) => {
      setSymbolsList(
        fetchResponse.map((value) => ({
          name: `${value.asset_id_base}/${value.asset_id_quote}`,
          data_quote_end: value.data_quote_end,
          price: value.price,
          symbol_id: value.symbol_id,
        }))
      );
    },
  });

  const [detailedSymbolsInfo, getDetailedSymbolsInfo] = useAxios<
    FetchSymbols[]
  >({
    url: `symbols?filter_symbol_id=${selectedValue?.symbol_id}`,
    onSuccess: (fetchResponse) => {
      const {
        asset_id_base,
        asset_id_quote,
        data_quote_end,
        price,
        symbol_id,
      } = fetchResponse[0];
      setSelectedValue({
        name: `${asset_id_base}/${asset_id_quote}`,
        data_quote_end,
        price,
        symbol_id,
      });
    },
  });

  const [chartInfoLoading, getChartInfo] = useAxios<FetchDetailedData[]>({
    url: `ohlcv/${selectedValue?.symbol_id}/latest?period_id=1MIN`,
    onSuccess: (fetchResponse) => {
      setChartInfo(
        fetchResponse
          .map(({ price_close, time_close }) => ({
            price: price_close,
            time: time_close,
          }))
          .reverse()
      );
    },
  });

  const toggleSubscribeClick = useCallback(() => {
    setIsSubscribed((prevState) => !prevState);
  }, []);

  useEffect(() => {
    getAllSelectOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedValue && !isSubscribed) {
      getChartInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue, isSubscribed]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isSubscribed) {
        getChartInfo();
        getDetailedSymbolsInfo();
      }
    }, MINUTE_IN_MILLISECONDS);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubscribed]);

  return (
    <FetchContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        symbolsList,
        selectedValue,
        chartInfo,
        isSubscribed,
        optionsSelectLoading,
        detailedSymbolsInfo,
        chartInfoLoading,
        toggleSubscribeClick,
        setSelectedValue,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
};

const useFetchContext = () => useContext(FetchContext);

export { FetchProvider, useFetchContext };
