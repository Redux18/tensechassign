const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());


app.post('/convert', async (req, res) => {
  try {
    const { amount, from_currency, to_currencies } = req.body;

    if (!amount || !from_currency || !to_currencies || !Array.isArray(to_currencies)) {
      return res.status(400).json({ error: 'Invalid request data.' });
    }

    const conversionPromises = to_currencies.map(async (to_currency) => {
      const conversion = await convertCurrency(amount, currencyA, currency);
      return { from_currency, to_currency, amount, converted_amount: conversion.amount };
    });

    const conversions = await Promise.all(conversionPromises);

    return res.json({ conversions });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred while converting currencies.' });
  }
});

// Function to convert currency using an external API (Open Exchange Rates)
async function convertCurrency(amount, from_currency, to_currency) {
  const API_KEY = 'a6e102051cb57f4b7985f7f'; // Replace with your actual API key
//   const apiUrl = `https://open.er-api.com/v6/latest/${from_currency}/${to_currency}/${amount}`;
const  apiUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/{currencyA}/{currencyB}.json`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Api-Key': API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
