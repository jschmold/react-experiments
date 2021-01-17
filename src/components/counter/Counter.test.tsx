import { render, RenderResult } from '@testing-library/react';
import { Simulate } from 'react-dom/test-utils';
import { Counter } from './Counter';


describe('Counter Component', () => {
  let fixture: RenderResult;
  let container: Element;

  beforeEach(() => {
    fixture = render(<Counter />);
    container = fixture.container;
  });

  it('increments counter', () => {
    const incrementor = container.querySelector('.counter .incrementor');
    expect(incrementor).toBeDefined();
    if (!incrementor) return;
    
    Simulate.click(incrementor)
    
    const display = container.querySelector('.counter .display');
    expect(display).toBeDefined();
    if (!display) return;
    
    expect(display.textContent).toEqual('Count: 1');
  });

  it('does not decrement below zero', () => {
    const decrementor = container.querySelector('.counter .decrementor');
    expect(decrementor).toBeDefined();
    if (!decrementor) return;
    
    Simulate.click(decrementor);
    
    const display = container.querySelector('.counter .display');
    expect(display).toBeDefined();
    if (!display) return;
    
    expect(display.textContent).toEqual('Count: 0');
  });

});