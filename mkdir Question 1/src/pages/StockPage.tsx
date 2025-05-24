import React, { useState, useEffect } from 'react';
import { Container, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { getStockPrices } from '../services/api';
import StockChart from '../components/StockChart';
import '../styles/global.css';

const StockPage: React.FC = () => {
  const [stockData, setStockData] = useState([]);
  const [timeInterval, setTimeInterval] = useState(30);
  const ticker = 'NVDA'; // Example ticker

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStockPrices(ticker, timeInterval);
      setStockData(data);
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [timeInterval]);

  return (
    <Container className="container">
      <FormControl className="select-container" sx={{ m: 2, minWidth: 120 }}>
        <InputLabel>Time Interval</InputLabel>
        <Select
          value={timeInterval}
          onChange={(e) => setTimeInterval(Number(e.target.value))}
          className="select"
        >
          <MenuItem value={15}>15 minutes</MenuItem>
          <MenuItem value={30}>30 minutes</MenuItem>
          <MenuItem value={60}>1 hour</MenuItem>
        </Select>
      </FormControl>
      <StockChart data={stockData} ticker={ticker} />
    </Container>
  );
};

export default StockPage;
