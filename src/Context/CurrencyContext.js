import React, { createContext, useState } from 'react'

export const CurrencyContext = createContext()

const CurrencyProvider = ({children}) => {
  const [fromCurrency, setFromCurrency] = useState("🇺🇸 USD United States")
  const [toCurrency, setToCurrency] = useState("🇳🇬 NGN Nigeria")
  const [firstAmount , setFirstAmount] = useState(0)

  const value = {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
    setFirstAmount
  } 

  return (
    <CurrencyContext.Provider value={value}>
        {children}
    </CurrencyContext.Provider>
  )
}

export default CurrencyProvider
