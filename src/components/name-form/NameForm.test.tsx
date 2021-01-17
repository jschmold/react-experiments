import { render } from '@testing-library/react';
import { NameForm } from './NameForm';
import { Simulate } from 'react-dom/test-utils';

test('lets you update the name', () => {
  const rendered = render(<NameForm />);
  const { baseElement } = rendered;
  
  const input: HTMLInputElement | null = baseElement.querySelector('.name-form .name-input');
  expect(input).toBeTruthy();

  if (input == null) return;

  input.value = 'User';
  Simulate.change(input);

  const nameDisplay = baseElement.querySelector('.name-form .name-display');
  expect(nameDisplay?.textContent).toContain('User');
  
});