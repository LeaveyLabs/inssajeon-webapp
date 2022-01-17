import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
//
import BaseOptionChart from './chart/BaseOptionChart';

// ----------------------------------------------------------------------

const CHART_DATA = [
  { name: '갑분싸', data: [31, 40, 28, 51, 42, 109, 100] },
  { name: '견박', data: [11, 32, 45, 32, 34, 52, 41] },
];

export default function ChartArea() {
  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      type: 'datetime',
      categories: [
        '2018-09-19T00:00:00.000Z',
        '2018-09-19T01:30:00.000Z',
        '2018-09-19T02:30:00.000Z',
        '2018-09-19T03:30:00.000Z',
        '2018-09-19T04:30:00.000Z',
        '2018-09-19T05:30:00.000Z',
        '2018-09-19T06:30:00.000Z',
      ],
    },
    tooltip: { x: { format: 'dd/MM/yy HH:mm' } },
  });

  return <ReactApexChart type="area" series={CHART_DATA} options={chartOptions} height={320} />;
}
