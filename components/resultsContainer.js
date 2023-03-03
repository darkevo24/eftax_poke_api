import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
  resultsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  noResults: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: theme.palette.text.secondary,
    margin: theme.spacing(2),
  },
}));

const SearchResult = ({ name, imageUrl }) => {
  const classes = useStyles();
  console.log(imageUrl)
  return (
    <div className={classes.result}>
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
    </div>
  );
};

const SearchResults = ({ results }) => {
  const classes = useStyles();

  if (!Array.isArray(results)) {
    return <p className={classes.noResults}>No results found.</p>;
  }

  return (
    <div className={classes.resultsContainer}>
      {results.length > 0 ? (
        results.map(({id,name,sprites}) => {
        return (
          <SearchResult key={id} name={name} imageUrl={sprites?.front_default} />
        )})
      ) : (
        <p className={classes.noResults}>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
