import { render } from '@testing-library/react';
import SearchResults from '../components/resultsContainer';
import '@testing-library/jest-dom';

describe('SearchResults component', () => {
  it('should render the search results', () => {
    const results = [
      { name: 'Pikachu', imageUrl: 'https://pokeapi.co/media/sprites/pokemon/25.png' },
      { name: 'Charizard', imageUrl: 'https://pokeapi.co/media/sprites/pokemon/6.png' },
      { name: 'Bulbasaur', imageUrl: 'https://pokeapi.co/media/sprites/pokemon/1.png' },
    ];
    const { getByText } = render(<SearchResults allPokemon={results} results={results} />);
    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(getByText('Charizard')).toBeInTheDocument();
    expect(getByText('Bulbasaur')).toBeInTheDocument();
  });
});
