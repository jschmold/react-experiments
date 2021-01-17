import configureMockStore from 'redux-mock-store';
import RegisterForm from './RegisterForm';

import { MockStore } from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, RenderResult } from '@testing-library/react';
import { Simulate } from 'react-dom/test-utils';
import { register, IRegisterProps } from '../../features/account/actions';


const createMockStore = configureMockStore([]);

describe('Register Form', () => {
  let fixture: RenderResult;
  let host: Element;
  let store: MockStore;

  const email = 'me@jonathanschmold.ca';
  const password = 'SomePassword1234';
  const name = 'Jonathan Schmold';
  const action = register({ email, password, name })

  let nameElement: HTMLInputElement;
  let pwdElement: HTMLInputElement;
  let emailElement: HTMLInputElement;
  let submitElement: HTMLInputElement;
  
  const getInputElement = (key: keyof IRegisterProps) =>
    host.querySelector(`.register-form .form-item.${key} input`) as HTMLInputElement;

  const getSubmitElement = () =>
    host.querySelector('.register-form .submit input') as HTMLInputElement;

  beforeEach(() => {
    store = createMockStore();
    
    fixture = render(
      <Provider store={store}>
        <RegisterForm />
      </Provider>
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
  
  it('Submits the form', () => {
    nameElement!.value = name;
    pwdElement!.value = password;
    emailElement!.value = email;

    Simulate.change(nameElement)
    Simulate.change(emailElement)
    Simulate.change(pwdElement);
    Simulate.click(submitElement);

    const [ firstAction ] = store.getActions();
    expect(firstAction).toEqual(action);
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
