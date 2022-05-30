import { format } from 'date-fns';

export const formatCurrency = (
  num: number,
  options: Intl.NumberFormatOptions = {}
) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 6,
    ...options,
  }).format(num);

export const formatDate = (date: string | number | Date) =>
  format(new Date(date), "MMM dd, hh:mm aaaaa'm'");
