import React, { useContext, useEffect, useState} from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import InputAmount from './Components/InputAmount';
import SelectCountry from './Components/SelectCountry';
import SwitchCurrency from './Components/SwitchCurrency';
import { CurrencyContext } from './Context/CurrencyContext';
import axios from 'axios';

function App() {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
  } = useContext(CurrencyContext)
  // Get the exchange rate for a given currency pair
  const [resultCurrency , setResultCurrency] = useState(0)
  const codeFromCurrency = fromCurrency.split("")[1]
  const codeToCurrency = toCurrency.split("")[1]

  useEffect(() =>{
    if(firstAmount) {
      axios("https://api.freecurrencyapi.com/v1/latest", {
        params : {
          apiKey: "fca_live_uO10ufXYgNjLq7QYYSRynQJFLq9kIZ6UTnRBmUBW",
          base_currency : codeFromCurrency,
          currencies : codeToCurrency,
        }
      })
      .then(response => setResultCurrency(response.data.data[codeToCurrency]))
      .catch(error => console.log(error))
    }
  }, [firstAmount])

  const boxStyles = {
    background : "#fdfdfd",
    marginTop : "8rem",
    textAlign : "center",
    color : "#222",
    minHeight : "20rem",
    borderRadius : 3,
    padding : "4rem 2rem",
    boxShadow : "0px 10px 15px -3px rgba(0,0,0,0.1)",
    position : "relative",
  }

  return (
    <Container maxWidth="md" sx={boxStyles}>
      <Typography variant='h5' sx={{marginBottom : "2rem"}}>Stay Ahead with Accurate Conversion</Typography>
      <Grid container spacing={2} gap={2}>
        <InputAmount/>
        <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From"/>
        <SwitchCurrency/>
        <SelectCountry value={toCurrency} setValue={setToCurrency} label="To"/>
      </Grid>
      {firstAmount ? (
        <Box sx={{textAlign : "left", marginTop : "1rem"}}>
          <Typography>{firstAmount} {fromCurrency} =</Typography>
          <Typography variant='h5' sx={{marginTop: "5px", fontWeight : "bold"}}>{resultCurrency} {toCurrency}</Typography>
        </Box>
      ) : ""}
    </Container>
  );
}

export default App;
