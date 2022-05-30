import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { useFetchContext } from '../context';
import { formatDate } from '../utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

const DetailedChart = () => {
  const { chartInfo, selectedValue } = useFetchContext();

  const data = useMemo(
    () => ({
      labels: chartInfo.map((item) => formatDate(item.time)),
      datasets: [
        {
          label: selectedValue?.name,
          data: chartInfo.map((item) => item.price),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    }),
    [chartInfo, selectedValue?.name]
  );
  return <Line options={options} data={data} />;
};

export { DetailedChart };
