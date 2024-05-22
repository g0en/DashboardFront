import { Box } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';

const StyledBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '20px 0',
});

const BaseBar = () => {
  const [data, setData] = useState([0, 0, 0]);

  useEffect(() => {
    // Simulating data loading with animation
    setTimeout(() => {
      setData([2, 5, 3]);
    }, 500);
  }, []);

  return (
    <StyledBox>
      <BarChart
        colors={['#581845']}
        xAxis={[
          {
            id: 'barCategories',
            data: ['bar A', 'bar B', 'bar C'],
            scaleType: 'band',
          },
        ]}
        series={[
          {
            data,
          },
        ]}
        width={500}
        height={300}
      />
    </StyledBox>
  );
};

export default BaseBar;