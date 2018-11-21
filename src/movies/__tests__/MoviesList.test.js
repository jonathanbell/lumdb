import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import MoviesList, { POSTER_PATH, BACKDROP_PATH } from '../MoviesList';

global.fetch = require('jest-fetch-mock');

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

console.error = jest.fn();

const movies = {
  success: true,
  results: [
    {
      title: 'Fantastic Beasts: The Crimes of Grindelwald',
      poster_path: '/uyJgTzAsp3Za2TaPiZt2yaKYRIR.jpg',
      id: 338952,
      overview:
        'Gellert Grindelwald has escaped imprisonment and has begun gathering followers to his cause—elevating wizards above all non-magical beings. The only one capable of putting a stop to him is the wizard he once called his closest friend, Albus Dumbledore. However, Dumbledore will need to seek help from the wizard who had thwarted Grindelwald once before, his former student Newt Scamander, who agrees to help, unaware of the dangers that lie ahead. Lines are drawn as love and loyalty are tested, even among the truest friends and family, in an increasingly divided wizarding world.'
    },
    {
      title: 'Test Title',
      poster_path: '/uyJgTzAsp3Za2TaPiZt2yaKYRIR.jpg',
      id: 123,
      overview: 'Foo. Bar.'
    }
  ]
};

const movie = movies.results[0];

test('<MoviesList />', async () => {
  fetch.mockResponseOnce(JSON.stringify(movies));

  const { getByTestId, queryByTestId, getAllByTestId } = render(
    <MemoryRouter>
      <MoviesList />
    </MemoryRouter>
  );

  // Are we showing our pre-loader?
  expect(getByTestId('loading')).toBeTruthy();
  // Get data via mocked API
  await waitForElement(() => getByTestId('movie-link'));

  // Is the pre-loader no longer on the page (data loaded)?
  expect(queryByTestId('loading')).toBeFalsy();

  expect(getByTestId('movie-link').getAttribute('href')).toBe(`/${movie.id}`);

  expect(getAllByTestId('movie-link').length).toBe(movies.results.length);
});

test('<MoviesList /> api fail', async () => {
  movies.success = false;
  fetch.mockResponseOnce(JSON.stringify(movies));

  const { getByTestId } = render(
    <MemoryRouter>
      <MoviesList />
    </MemoryRouter>
  );

  // Are we showing our pre-loader?
  expect(getByTestId('loading')).toBeTruthy();
});
