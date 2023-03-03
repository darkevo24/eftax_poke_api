import Head from 'next/head';
import { useState } from 'react';
import SearchResults from '../components/resultsContainer';
import React,{useRef,useEffect} from 'react';
import '..mock';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef(null);
  const [isOnline, setIsOnline] = useState(true);
  const [allPokemon,setAllPokemon] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon').then(response => response.json())
    .then(data => {
      const pokemonList = data.results;
      setAllPokemon(pokemonList);
    }).catch(error => {
      console.error('Error fetching all Pokemon:', error);
    });

    if (typeof window !== 'undefined') {
      setIsOnline(window.navigator.onLine);
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };

  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
  
    const searchTerm = searchInputRef.current.value.toLowerCase();
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
      );
  
      if (!response.ok) {
        throw new Error("Pokemon not found");
      }
  
      const data = await response.json();
      setSearchResults([data]);
    } catch (error) {
      setSearchResults([]);
      console.error(error);
    }
  
    setIsLoading(false);
  };  

  return (
  <div className="w-full h-full p-6">
    <Head>
      <title>Pokemon Browser</title>
    </Head>

    {!isOnline && (
      <div className="bg-red-400 text-white p-2 text-center mb-3">
        You are currently offline. Please check your network connection.
      </div>
    )}

    <div className="flex justify-center items-center px-4">
      <form onSubmit={handleSearchSubmit} className="w-full">
        <div className="flex justify-center items-center relative">
          <input
            ref={searchInputRef}
            id="search-input"
            type="text"
            placeholder="Search Pokemon"
            value={searchTerm}
            onChange={handleSearchTermChange}
            className="w-full md:w-96 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
          />
          {isLoading ? (
            <div class="flex items-center justify-center">
              <div class="h-8 w-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mr-3"></div>
              <div>Loading...</div>
            </div>
          ) : (
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 ml-2"
            >
              Search
            </button>
          )}
        </div>
      </form>
    </div>

    <div className="p-4">
      <SearchResults allPokemon={allPokemon} results={searchResults} />
    </div>
  </div>
  );
}
