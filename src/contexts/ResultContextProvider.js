import { type } from '@testing-library/user-event/dist/type';
import React, { createContext, useContext, useState } from 'react'

const ResultContext = createContext()
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1'

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getResults = async (url) => {
    setLoading(true);
    console.log('env', process.env)

    const res = await fetch(`${baseUrl}${url}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'google-search3.p.rapidapi.com',
        'x-proxy-location': 'ID',
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
      },
    });

    const data = await res.json();
    console.log('url', url)

    if (url.includes('/news')) {
      setResults(data.entries)
    } else if (url.includes('/images')) {
      setResults(data.image_results)
    } else {
      setResults(data.results)
    }

    // setResults(data);
    setLoading(false);
  };

  return (
    <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, loading }}>
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);