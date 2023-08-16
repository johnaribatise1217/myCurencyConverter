import { Grid, Autocomplete, TextField, Skeleton } from '@mui/material'
import React from 'react'
import useAxios from '../Hooks/useAxios'

const SelectCountry = (props) => {
  const {value , setValue, label} = props
  const [countries, loaded, error] = useAxios("https://restcountries.com/v3.1/all")
  const countriesFilter = countries.filter(item => "currencies" in item)
  const country = countriesFilter.map(item => {
    return `${item.flag} ${Object.keys(item.currencies)[0]} ${item.name.common}`
  })

  if(loaded){
    return (
      <Grid item xs={12} md={3}>
        <Skeleton variant='rounded' height={60}/>
      </Grid>
    )
  }

  if (error){
    return "Something went wrong!"
  }

  return (
    <Grid item xs={12} md={4}>
      <Autocomplete value={value} disableClearable onChange={(e, newValue) => setValue(newValue)} options={country} renderInput={(params) => <TextField {...params} label={label}/>}
      />
    </Grid>
  )
}

export default SelectCountry
