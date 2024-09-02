import { useEffect, useState } from 'react';
import pluralize from 'pluralize';
import { Box, Container, Grid, Typography } from '@mui/material';
import CustomFetch from '../components/admin/CustomFetch';
import { API_ROOT } from '../components/admin/CustomDataProvider';
import { CTAButton, getUserToken } from '../components/Utils';
import io from 'socket.io-client';
import { LivePrice, Stock } from '../types';

export const MainWithRedirect = () => {
  const userToken = getUserToken();
  useEffect(() => {
    if(!userToken){
      window.location.href= '/manage/login';
    }
  }, [userToken]);

  if(!userToken){
    return null;
  }
  return <Main />;
}

const StockPricesTable = ({ stockPrices, latestUpdate }: { stockPrices: LivePrice[], latestUpdate: Date }) => {
  const [previousUpdate, setPreviousUpdate] = useState<Date | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setPreviousUpdate(latestUpdate);
    }, 2000);
  }, [latestUpdate]);

  if (!stockPrices || stockPrices.length === 0) {
    return (
      <Box mt={2}>
        <Typography variant="h6">Your watchlist is empty</Typography>
        <Box mt={2}>
          <CTAButton href="/manage/watches" text="Add stocks to your watchlist" />
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        variant="caption"
        key={latestUpdate.toString()}
        style={{ 
          color: latestUpdate !== previousUpdate ? 'green' : 'inherit', 
          transition: 'color 2s ease-in-out'
        }}
      >
        Last updated: {latestUpdate.toLocaleString()}
      </Typography>
      <Box component="table" width="100%" border="1">
        <Box component="thead">
          <Box component="tr">
            <Box component="th">Symbol</Box>
            <Box component="th">Quantity</Box>
            <Box component="th">Last Price</Box>
            <Box component="th">Purchase Price</Box>
            <Box component="th">Total Value</Box>
            <Box component="th">Change</Box>
            <Box component="th">Last Updated</Box>
          </Box>
        </Box>
        <Box component="tbody">
          {stockPrices.map((stock: any, index) => (
            <Box component="tr" key={index}>
              <Box component="td">{stock.symbol}</Box>
              <Box component="td" align="center">{stock.quantity} {pluralize("share", stock.quantity)}</Box>
              <Box component="td" align="right">${(stock.price ?? 0).toFixed(2)}</Box>
              <Box component="td" align="right">${(stock.purchasePrice ?? 0).toFixed(2)}</Box>
              <Box component="td" align="right">${((stock.price ?? 0) * (stock.quantity ?? 0)).toFixed(2)}</Box>
              <Box component="td" align="right">${(((stock.price ?? 0) - (stock.purchasePrice ?? 0)) * (stock.quantity ?? 0)).toFixed(2)}</Box>
              <Box component="td" align="center">{new Date(stock.date).toLocaleString()}</Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box mt={2}>
          <CTAButton href="/manage/watches" text="Manage your watchlist" />
        </Box>
    </Box>
  );
};

export const Main = () => {
  const [stockPrices, setStockPrices] = useState<LivePrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [latestUpdate, setLatestUpdate] = useState(new Date());

  const fetchLatestStockPrices = async () => {
    try {
      const response = await CustomFetch(`${API_ROOT}/watches/latest-prices`, {
        method: 'GET',
      });
      if (!response.ok) throw new Error('Failed to fetch latest stock prices');
      setStockPrices(response.json.latestPrices);
      setLatestUpdate(new Date());
    } catch (error) {
      console.error('Error fetching stock prices:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStocks = (updatedStocks: Stock[]) => {
    setStockPrices((prevStockPrices) => {
      const newStockPrices = prevStockPrices.map((stock) => {
        const updatedStock = updatedStocks.find(s => s.symbol === stock.symbol);
        return updatedStock ? {
          ...stock,
          price: updatedStock.latestPrice,
          date: updatedStock.updatedAt
        } : stock;
      });
      setLatestUpdate(new Date());
      return newStockPrices;
    });
  };

  useEffect(() => {
    fetchLatestStockPrices();

    // Connect to WebSocket
    const socket = io(`${API_ROOT}`);

    socket.on('stockUpdate', updateStocks);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5">Latest Stock Prices</Typography>
            {loading ? (
              <Typography variant="h6">Loading...</Typography>
            ) : (
              <StockPricesTable stockPrices={stockPrices} latestUpdate={latestUpdate} />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
