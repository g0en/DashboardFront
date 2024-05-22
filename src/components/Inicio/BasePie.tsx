import { PieChart } from '@mui/x-charts/PieChart';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';

const StyledPieChart = styled(PieChart)({
  margin: '20px auto',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

export default function BasePie() {
  const [data, setData] = useState([
    { id: 0, value: 0, label: 'series A' },
    { id: 1, value: 0, label: 'series B' },
    { id: 2, value: 0, label: 'series C' },
  ]);

  useEffect(() => {
    // Simulating data loading with animation
    setTimeout(() => {
      setData([
        { id: 0, value: 10, label: 'series A' },
        { id: 1, value: 15, label: 'series B' },
        { id: 2, value: 20, label: 'series C' },
      ]);
    }, 500);
  }, []);

  return (
    <StyledPieChart
      colors={['#C70039', '#FF5733', '#DAF7A6']}
      series={[
        {
          data,
        },
      ]}
      width={400}
      height={200}
    />
  );
}
