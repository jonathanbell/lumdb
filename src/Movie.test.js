import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import Movie, { POSTER_PATH } from './Movie';

afterEach(() => {
  cleanup();
  // This so our `<Movie /> with movie` test will pass.
  // Since we initially called `<Movie />` with no `movie` (undefinded),
  // we expect `console.error` `toBeCalled()` via our mock function.
  // `console.error()` will not be called when we pass legit props to `<Movie />`
  // So, we reset (clear) our mocked function.
  console.error.mockClear();
});

console.error = jest.fn();

test('<Movie />', () => {
  render(<Movie />);
  expect(console.error).toBeCalled();
});

const movie = {
  title: 'Fantastic Beasts: The Crimes of Grindelwald',
  poster_path: '/uyJgTzAsp3Za2TaPiZt2yaKYRIR.jpg',
  id: 338952,
  overview:
    'Gellert Grindelwald has escaped imprisonment and has begun gathering followers to his cause—elevating wizards above all non-magical beings. The only one capable of putting a stop to him is the wizard he once called his closest friend, Albus Dumbledore. However, Dumbledore will need to seek help from the wizard who had thwarted Grindelwald once before, his former student Newt Scamander, who agrees to help, unaware of the dangers that lie ahead. Lines are drawn as love and loyalty are tested, even among the truest friends and family, in an increasingly divided wizarding world.'
};

test('<Movie /> with movie', () => {
  const { getByTestId } = render(
    // When using React Router, we cannot test a component that is wrapped in a <Router>
    // To avoid this, we use <MemoryRouter> (a special feature of react-router-dom)
    <MemoryRouter>
      <Movie movie={movie} />
    </MemoryRouter>
  );
  expect(console.error).not.toBeCalled();
  expect(getByTestId('movie-link').getAttribute('href')).toBe(`/${movie.id}`);
  expect(getByTestId('movie-image').src).toBe(
    `${POSTER_PATH}${movie.poster_path}`
  );
});
