import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import MovieDetail, { POSTER_PATH, BACKDROP_PATH } from '../MovieDetail';

// Freakiness!
// We can overwrite `fetch()` here and use our own (mocked) version of `fetch()`
global.fetch = require('jest-fetch-mock');

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

const match = {
  params: {
    id: 'foo'
  }
};

console.error = jest.fn();

const movie = {
  adult: false,
  backdrop_path: '/aw4FOsWr2FY373nKSxbpNi3fz4F.jpg',
  budget: 178000000,
  homepage: 'https://www.missionimpossible.com/',
  id: 353081,
  imdb_id: 'tt4912910',
  original_language: 'en',
  original_title: 'Mission: Impossible - Fallout',
  overview:
    'When an IMF mission ends badly, the world is faced with dire consequences. As Ethan Hunt takes it upon himself to fulfill his original briefing, the CIA begin to question his loyalty and his motives. The IMF team find themselves in a race against time, hunted by assassins while trying to prevent a global catastrophe.',
  popularity: 194.274,
  poster_path: '/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg',
  release_date: '2018-07-13',
  revenue: 791017452,
  runtime: 148,
  status: 'Released',
  tagline: 'Some Missions Are Not A Choice',
  title: 'Mission: Impossible - Fallout',
  video: false,
  vote_average: 7.3,
  vote_count: 2269
};

test('<MovieDetail />', async () => {
  fetch.mockResponseOnce(JSON.stringify(movie));

  const { getByTestId } = render(<MovieDetail match={match} />);
  await waitForElement(() => getByTestId('movie-title'));

  expect(getByTestId('movie-title').textContent).toBe(movie.title);
  expect(getByTestId('movie-poster').src).toBe(
    `${POSTER_PATH}${movie.poster_path}`
  );
  expect(getByTestId('movie-releasedate').textContent).toBe(movie.release_date);
  expect(getByTestId('movie-overview').textContent).toBe(movie.overview);
});
