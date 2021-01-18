import * as actions from '../actions';

import { AnyAction, MiddlewareAPI, Dispatch } from '@reduxjs/toolkit';
import { registerMiddleware } from './register';
import {registerSuccess} from '../actions';


describe('registerMiddleware', () => {

  let next: Dispatch<AnyAction>;
  let store: MiddlewareAPI;

  beforeAll(() => jest.useFakeTimers('modern'));
  afterAll(() => jest.useRealTimers());

  beforeEach(() => {
    next = jest.fn();
    store = {
      dispatch: jest.fn(),
      getState: jest.fn(() => ({})),
    };
  });

  afterEach(() => jest.useRealTimers());

  it('waits one second', async () => {
    const action = actions.register({
      email: 'me@jonathanschmold.ca',
      password: 'hee-haw-yee-haw',
    });

    const resultTask = registerMiddleware(store)(next)(action);
    jest.advanceTimersByTime(1000);
    await resultTask;
    expect(next).toHaveBeenCalledWith(registerSuccess());
  });
});
