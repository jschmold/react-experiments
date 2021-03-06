import configureMockStore from 'redux-mock-store';
import RegisterForm from './RegisterForm';
import React from 'react';
import thunk from 'redux-thunk';

import { MockStore } from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, RenderResult } from '@testing-library/react';
import { Simulate } from 'react-dom/test-utils';
import { register, IRegisterProps } from '../../features/account/actions';

const mockStore = configureMockStore([thunk]);

describe('Register Form', () => {
  let fixture: RenderResult;
  let host: Element;
  let store: MockStore;

  const email = 'me@jonathanschmold.ca';
  const password = 'SomePassword1234';
  const name = 'Jonathan Schmold';

  let nameElement: HTMLInputElement;
  let pwdElement: HTMLInputElement;
  let emailElement: HTMLInputElement;
  let submitElement: HTMLInputElement;
  
  const getInputElement = (key: keyof IRegisterProps) =>
    host.querySelector(`.register-form .form-item.${key} input`) as HTMLInputElement;

  const getSubmitElement = () =>
    host.querySelector('.register-form .submit input') as HTMLInputElement;

  beforeEach(() => {
    store = mockStore();
    
    fixture = render(
      <React.StrictMode>
        <Provider store={store}>
          <RegisterForm />
        </Provider>
      </React.StrictMode>
    );
    host = fixture.container;
  });

  beforeEach(() => {
    nameElement = getInputElement('name');
    emailElement = getInputElement('email');
    pwdElement = getInputElement('password');
    submitElement = getSubmitElement();

    for (const el of [ nameElement, emailElement, pwdElement, submitElement ] ) {
      expect(el).toBeDefined();
    }
  })

  afterEach(() => {
    fixture.unmount();
  });
  
  it('Submits the form', async () => {
    const spy = jest.spyOn(store, 'dispatch');

    nameElement!.value = name;
    pwdElement!.value = password;
    emailElement!.value = email;

    Simulate.change(nameElement)
    Simulate.change(emailElement)
    Simulate.change(pwdElement);
    Simulate.click(submitElement);

    const act = register({ email, password, name })
    expect(spy).toHaveBeenCalledWith(act);
  });

  it('tells you if your email is invalid', () => {
    emailElement.value = '';
    Simulate.change(emailElement);
    Simulate.click(submitElement);

    Simulate.change(host);

    const el = host.querySelector('.email .field-error');
    expect(el).toBeTruthy();
  });

  it('does not let you submit without a password', () => {
    emailElement.value = email;
    Simulate.change(emailElement);

    Simulate.click(submitElement);
    expect(store.getActions().length).toEqual(0);
  });

  it('does not let you submit without an email', () => {
    pwdElement.value = password;
    Simulate.change(pwdElement);

    Simulate.click(submitElement);
    expect(store.getActions().length).toEqual(0);
  });
});
