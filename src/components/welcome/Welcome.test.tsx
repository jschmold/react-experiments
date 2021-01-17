import { render } from '@testing-library/react';
import { Welcome } from './Welcome';

test('has the welcome message', () => {
  const { baseElement }= render( <Welcome /> )
  
  const el = baseElement.querySelector('.welcome');
  expect(el).toBeTruthy();
  
  const msg = el?.querySelector('h3.message');
  expect(msg).toBeTruthy();
  expect(msg?.textContent).toContain('Welcome to the App!');
});

test('welcomes the user in the message', () => {
  const name = 'User';
  const { baseElement } = render( <Welcome name={name} />)
  const el = baseElement.querySelector('.welcome .message');
  expect(el?.textContent).toContain(name);
});