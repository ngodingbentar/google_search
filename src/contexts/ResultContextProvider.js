import { type } from '@testing-library/user-event/dist/type';
import React, { createContext, useContext, useState } from 'react'

const ResultContext = createContext()
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1'

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('javascript');

  const getResults = async (url) => {
    setLoading(true);

    const res = await fetch(`${baseUrl}${url}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'google-search3.p.rapidapi.com',
        'x-proxy-location': 'ID',
        'x-rapidapi-key': '22faaa629emsh5679360207d5987p18cb0ejsn14038d317e16',
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