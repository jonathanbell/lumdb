import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import Counter from './Counter';

afterEach(cleanup);

test('<Counter />', () => {
  const { debug, getByTestId } = render(<Counter />);
  const counterbutton = getByTestId('counter-button');

  // debug(); // outputs DOM as a string to the console

  expect(counterbutton.tagName).toBe('BUTTON');
  expect(counterbutton.textContent).toBe('0');

  fireEvent.click(counterbutton);
  expect(counterbutton.textContent).toBe('1');

  fireEvent.click(counterbutton);
  expect(counterbutton.textContent).toBe('2');
});
