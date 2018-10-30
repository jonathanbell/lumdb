import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';

const Movie = ({ movie }) => (
  <Link to={`/${movie.id}`}>
    <Overdrive id={String(movie.id)}>
      <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
    </Overdrive>
  </Link>
);

Movie.propTypes = {
  movie: PropTypes.shape({
    // Validates that the `title` is a prop type of string and is not NULL
    title: PropTypes.string.isRequired,
    overview: PropTypes.string
  }).isRequired
};

export default Movie;

export const Poster = styled.img`
  box-shadow: 0 0 30px black;
`;
