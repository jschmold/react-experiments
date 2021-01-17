import { useState } from 'react';
import { register } from '../../features/account/actions';
import { connect, useDispatch } from 'react-redux';
import validator from 'validator';

interface IComponentState {
  name: string;
  email: string;
  password: string;
}

interface IComponentErrors {
  email: null | string; 
  password: null | string;
}

function RegisterForm() {
  const [ state, setState ] = useState<IComponentState>({ email: '', password: '', name: '' })
  const [ errors, setErrors ] = useState<IComponentErrors>({ email: null, password: null });
  const dispatch = useDispatch();

  const updateFormField = (val: Partial<IComponentState>) => {
    setState({ ...state, ...val });   
    validateForm();
  }

  const setName = (name: string) => updateFormField({ name });
  const setEmail = (email: string)  => updateFormField({ email });
  const setPassword = (password: string) => updateFormField({ password });
  const isEmpty = (key: 'email' | 'password') => state[key].trim().length === 0;

  const validateForm = () => {
    const { email, password } = state;
    const errors: IComponentErrors = { email: null, password: null };

    if (email.trim().length > 0 && !validator.isEmail(email)) {
      errors.email = 'Invalid email address';
    }

    if (password.trim().length > 0 && [ /\w/, /\d/ ].find(a => !a.test(password))) {
      errors.password = 'Password needs at least 1 letter and at least 1 digit';
    } else if (password.trim().length < 8) {
      errors.password = 'Password needs to be at least 7 characters';
    }

    setErrors(errors);
    return Object.values(errors).every(a => a == null);
  }
  
  const submit = () => {
    if (isEmpty('email') || isEmpty('password')) return;
    
    if (!validateForm()) return;

    const { email, password, name } = state;
    const action = register({ email, password, name });
    dispatch(action);
  }
  
  return (
    <form className="register-form">
      <div className="form-item name">
        <label htmlFor="name" className="form-label">Name</label>
        { errors.password && <span className="field-error">{errors.password}</span> }
        <input
          type="text"
          name="name"
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className="form-item email">
        <label htmlFor="email" className="form-label">Email Address</label>
        { errors.email && <span className="field-error">{errors.email}</span> }
        <input
          type="email"
          required
          name="email"
          onChange={e => setEmail(e.target.value)}
          />
      </div>

      <div className="form-item password">
        <label htmlFor="password" className="form-label">Password</label>
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
