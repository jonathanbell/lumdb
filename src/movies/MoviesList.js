/* eslint react/no-did-mount-set-state: 0 */
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Movie from './Movie';

class MoviesList extends PureComponent {
  state = {
    // Set our initial state to be an empty array.
    // We will populate this after our api call.
    movies: []
  };

  async componentDidMount() {
    try {
      const apiKey = '10fe9c3760b6f3190cdba07bdcc4f3d4';

      const result = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&include_adult=true&include_video=false&page=1`
      );
      const movies = await result.json();

      if (typeof movies.results !== 'undefined' && movies.results.length) {
        // Our API call has returned! :)
        movies.success = true;
        this.setState({
          movies: movies.results
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    if (this.state.movies.length < 1) {
      return (
        <h1 style={{ color: '#fff' }} data-testid="loading">
          Loading Movies...
        </h1>
      );
    }

    return (
      <MovieGrid>
        {this.state.movies.map(movie => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </MovieGrid>
    );
  }
}

export default MoviesList;

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 1rem;
`;
