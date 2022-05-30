import axios, { AxiosRequestConfig } from 'axios';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { toast_settings } from '../utils';

type useAxiosReturn = [boolean, () => Promise<void>];

interface Props<T> extends AxiosRequestConfig {
  url: string;
  onSuccess?: (data: T) => void;
}

export const useAxios = <T>({
  url,
  onSuccess,
  method = 'GET',
  headers,
  ...rest
}: Props<T>): useAxiosReturn => {
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios(
        `${process.env.REACT_APP_COIN_BASE_URL}/${url}`,
        {
          method,
          headers: {
            'X-CoinAPI-Key': process.env.REACT_APP_COIN_API_KEY as string,
            'X-ConcurrencyLimit-Limit': '10',
            'X-ConcurrencyLimit-Remaining': '2',
            ...headers,
          },
          ...rest,
        }
      );

      onSuccess?.(response.data);
    } catch (error) {
      toast.error('Somethin goes wrong', toast_settings);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method, url]);

  return [loading, fetch];
};
