import * as constants from '../constants';

import { Middleware } from "@reduxjs/toolkit";
import {registerSuccess} from '../actions';

export interface IRegisterProps {
  name?: string;
  email: string;
  password: string;
}

export const registerMiddleware: Middleware<IRegisterProps> = () => next => async action => {
  if (!('type' in action)) return next(action);

  if (action.type !== constants.register) return next(action);

  const result = await performRegistration();
  console.log(result);

  return next(registerSuccess());
}

async function performRegistration(): Promise<string> {
  await new Promise(r => setTimeout(r, 1000));
  return 'it worked yeeet';
}
