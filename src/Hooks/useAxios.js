import React, { useEffect, useState } from 'react'
import axios from 'axios'

const useAxios = (url) => {
  const [countries , setCountries] = useState([])
  const [error, setError] = useState(null)
  const [loaded , setLoaded] = useState(false)

  useEffect(() => {
    const fetchData = async () =>{
        try {
            setLoaded(true)
            const res = await axios(url)
            setCountries(res.data)
        } catch(error) {
            setError(error)
        } finally{
            setLoaded(false)
        }
    } 
    fetchData()

  }, [url])

  return [countries, error, loaded]
}

export default useAxios
