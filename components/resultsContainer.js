import React, { useState,useEffect } from 'react';

const SearchResult = ({ key,name, imageUrl,type,url }) => {
  const [data,setData] = useState();
  useEffect(()=> {
    fetch(url).then(response => response.json())
    .then(data => {
      setData(data);
      console.log(data);
    }).catch(error => {
      console.error('Error fetching all Pokemon:', error);
    });
  },[url])
  return (
    <div key={key} className="bg-white shadow-md rounded-md p-4 my-2 md:flex md:items-center md:justify-between">
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="w-20 h-20 rounded-full mx-auto md:mx-0 md:w-24 md:h-24 md:mr-4"/>
      ) :
      <img src={data?.sprites?.front_default} alt={name} className="w-20 h-20 rounded-full mx-auto md:mx-0 md:w-24 md:h-24 md:mr-4"/>
      }
      <div className="text-center md:text-left">
        <p className="text-lg font-medium">{name}</p>
        {type ? (
          <p className="text-gray-600">
            Type: {type.map((item) => (item + " "))}
          </p>
        )
         : 
         (
          <p className="text-gray-600">
            Type: {data?.types.map((item) => (item.type.name + " "))}
          </p>
        )
        }
      </div>
    </div>
  );
};

const SearchResults = ({ results,allPokemon }) => {
  const [sortCriteria, setSortCriteria] = useState('name'); 
  const [sortDirection, setSortDirection] = useState('asc'); 

  const compareResults = (a, b) => {
    const aValue = a[sortCriteria];
    const bValue = b[sortCriteria];

    if (aValue < bValue) {
      return sortDirection === 'asc' ? -1 : 1; 
    } else if (aValue > bValue) {
      return sortDirection === 'asc' ? 1 : -1; 
    } else {
      return 0;
    }
  };

  const sortedResultsAllPokemon = [...allPokemon].sort(compareResults);
  if (!Array.isArray(results)) {
    return <p>No results found.</p>;
  }

  return (
<div className="flex flex-col justify-center items-center">
  <div className="w-full max-w-sm mb-3">
    <label htmlFor="sort-criteria" className="text-sm font-medium text-gray-700">Sort by:</label>
    <div className="relative">
      <select
        id="sort-criteria"
        value={sortCriteria}
        onChange={(event) => setSortCriteria(event.target.value)}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="name">Name</option>
        <option value="type">Type</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M14.292 7.292a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L15.586 12H5a1 1 0 010-2h10.586l-1.294-1.292a1 1 0 010-1.414z"/></svg>
      </div>
    </div>
  </div>
  <button
    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
    onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
  >
    {sortDirection === 'asc' ? '▲' : '▼'}
  </button>
  <div className="flex flex-col justify-center items-center">
    {results.length > 0 ? (
      results.map(({id,name,sprites,types}) => {
        const type = types.map((item) => item.type.name);
        return (
          <SearchResult key={id} name={name} type={type} imageUrl={sprites?.front_default} />
        );
      })
    ) : (
      sortedResultsAllPokemon.map(({id,name,url}) => {
        return (
          <SearchResult key={id} name={name} url={url} />
        );
      })
    )}
  </div>
</div>
  );
};

export default SearchResults;
