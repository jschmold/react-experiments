import * as constants from './constants';

import { createAction } from "@reduxjs/toolkit";

export interface IRegisterProps {
  name?: string;
  email: string;
  password: string;
}

export const register = createAction<IRegisterProps>(constants.register);
