import { useState } from 'react';
import { register } from '../../features/account/actions';
import { connect, useDispatch } from 'react-redux';
import validator from 'validator';

interface ISubmitForm {
  name: string;
  email: string;
  password: string;
}

interface IComponentState {
  hasSubmitted: boolean;
}

interface IComponentErrors {
  email: null | string; 
  password: null | string;
}

function RegisterForm() {
  const [ form, setForm ] = useState<ISubmitForm>({ email: '', password: '', name: '' })
  const [ state, setState ] = useState<IComponentState>({ hasSubmitted: false });
  const [ errors, setErrors ] = useState<IComponentErrors>({ email: null, password: null });
  const dispatch = useDispatch();

  const updateFormField = (val: Partial<ISubmitForm>) => {
    setForm({ ...form, ...val });   
    validateForm();
  }

  const setName = (name: string) => updateFormField({ name });
  const setEmail = (email: string)  => updateFormField({ email });
  const setPassword = (password: string) => updateFormField({ password });
  const isEmpty = (key: 'email' | 'password') => form[key].trim().length === 0;

  // HTML helpers
  const hasError = (key: 'email' | 'password') => state.hasSubmitted && errors[key] != null;

  const validateForm = () => {
    const { email, password } = form;
    const errors: IComponentErrors = { email: null, password: null };

    if (!validator.isEmail(email)) {
      errors.email = 'Invalid email address';
    }

    if ([ /\w/, /\d/ ].find(a => !a.test(password))) {
      errors.password = 'Password needs at least 1 letter and at least 1 digit';
    } else if (password.trim().length < 8) {
      errors.password = 'Password needs to be at least 7 characters';
    }

    setErrors(errors);
    return Object.values(errors).every(a => a == null);
  }
  
  const submit = () => {
    if (!state.hasSubmitted) setState({ hasSubmitted: true })

    if (isEmpty('email') || isEmpty('password')) return;
    
    if (!validateForm()) return;

    const { email, password, name } = form;
    const action = register({ email, password, name });
    dispatch(action);
  }
  
  
  return (
    <form className="register-form">
      <div className="form-item name">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          name="name"
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className="form-item email">
        <label htmlFor="email" className="form-label">Email Address</label>
        { hasError('email') && <span className="field-error">{errors.email}</span> }
        <input
          type="email"
          required
          name="email"
          onChange={e => setEmail(e.target.value)}
          />
      </div>

      <div className="form-item password">
        <label htmlFor="password" className="form-label">Password</label>
        { hasError('password') && <span className="field-error">{errors.password}</span> }
        <input
          type="password"
          required
          name="password"
          minLength={8}
          maxLength={64}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <div className="form-item submit">
        <input type="submit" className="submit-button" onClick={submit} />
      </div>

    </form>
  );
}

export default connect()(RegisterForm);
