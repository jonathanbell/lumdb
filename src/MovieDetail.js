/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import { Poster } from './Movie';

export const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
export const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

class MovieDetail extends Component {
  state = {
    // We set our initial state to be an empty array.
    // We will populate this after our api call.
    movie: {}
  };

  // AFTER the component has mounted, make the API call.
  // Why only after it's mounted? Because we probably want to show a "loading"
  // message or something like that while the call to the API is made.
  async componentDidMount() {
    try {
      const apiKey = '10fe9c3760b6f3190cdba07bdcc4f3d4';

      const result = await fetch(
        `https://api.themoviedb.org/3/movie/${
          this.props.match.params.id
        }?api_key=${apiKey}`
      );

      const movie = await result.json();

      // Our API call has returned! :)
      // So set state `movie` value to `movie` property returned in the JSON
      this.setState({ movie });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { movie } = this.state;

    if (Object.keys(movie).length === 0) return null;

    return (
      <MovieWrapper
        data-testid="movie-backdrop"
        backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}
      >
        <MovieInfo>
          <Overdrive id={String(movie.id)}>
            <Poster
              data-testid="movie-poster"
              src={`${POSTER_PATH}${movie.poster_path}`}
              alt={movie.title}
            />
          </Overdrive>
          <div>
            {/* Inline condtional */}
            {movie.title ? (
              <h1 data-testid="movie-title">{movie.title}</h1>
            ) : (
              <h1 data-testid="movie-title">Untitled</h1>
            )}
            <h3 data-testid="movie-releasedate">{movie.release_date}</h3>
            <p data-testid="movie-overview">{movie.overview}</p>
          </div>
        </MovieInfo>
      </MovieWrapper>
    );
  }
}

export default MovieDetail;

const MovieWrapper = styled.div`
  position: relative;
  padding-top: 50vh;
  background: url(${props => props.backdrop}) no-repeat;
  background-size: cover;
`;

const MovieInfo = styled.div`
  background: white;
  text-align: left;
  padding: 2rem 10%;
  display: flex;
  > div {
    margin-left: 20px;
  }
  img {
    position: relative;
    top: -5rem;
  }
`;
