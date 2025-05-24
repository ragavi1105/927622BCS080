import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Paper } from '@mui/material';
import { StockPrice } from '../services/api';
import '../styles/global.css';

interface StockChartProps {
  data: StockPrice[];
  ticker: string;
}

const StockChart: React.FC<StockChartProps> = ({ data, ticker }) => {
  const chartData = {
    labels: data.map(d => new Date(d.lastUpdatedAt).toLocaleTimeString()),
    datasets: [
      {
        label: `${ticker} Price`,
        data: data.map(d => d.price),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Average',
        data: Array(data.length).fill(data.reduce((acc, curr) => acc + curr.price, 0) / data.length),
        borderColor: 'rgb(255, 99, 132)',
        borderDash: [5, 5],
      },
    ],
  };

  return (
    <Paper elevation={3} className="chart-container">
      <Box p={2}>
        <Line 
          data={chartData} 
          options={{ 
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: `${ticker} Stock Price Chart`
              }
            },
            scales: {
              y: {
                beginAtZero: false
              }
            }
          }} 
        />
      </Box>
    </Paper>
  );
};

export default StockChart;
