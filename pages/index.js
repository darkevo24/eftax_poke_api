import Head from 'next/head';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import SearchResults from '../components/resultsContainer';
import React,{useRef} from 'react';
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
  },
  searchInput: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
  searchButton: {
    marginTop: theme.spacing(2),
  },
  resultsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  resultItem: {
    margin: theme.spacing(2),
    textAlign: 'center',
    textDecoration: 'none',
  },
  resultImage: {
    display: 'inline-block',
  },
  resultName: {
    marginTop: theme.spacing(1),
    fontWeight: 'bold',
  },
}));

export default function Home() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef(null);

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
    <div className={classes.root}>
      <Head>
        <title>Pokemon Browser</title>
      </Head>

      <Grid container spacing={3} className={classes.searchContainer}>
        <Grid item xs={12} sm={8} md={6}>
          <form onSubmit={handleSearchSubmit}>
            <TextField
            inputRef={searchInputRef}
              id="search-input"
              label="Search Pokemon"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearchTermChange}
              className={classes.searchInput}
            />
            {isLoading ? (
              <CircularProgress className={classes.searchButton} />
            ) : (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.searchButton}
              >
                Search
              </Button>
            )}
          </form>
        </Grid>
      </Grid>

      <div className={classes.resultsContainer}>
        <SearchResults results={searchResults} />
      </div>
    </div>
  );
}
