import { useState } from 'react';
import { register } from '../../features/account/actions';
import { connect, useDispatch } from 'react-redux';
import validator from 'validator';

interface IComponentState {
  name: string;
  email: string;
  password: string;
}

function RegisterForm() {
  const [ state, setState ] = useState({ email: '', password: '', name: '' })
  const dispatch = useDispatch();

  const updateFormField = (val: Partial<IComponentState>) => setState({ ...state, ...val });
  const setName = (name: string) => updateFormField({ name });
  const setEmail = (email: string)  => updateFormField({ email });
  const setPassword = (password: string) => updateFormField({ password });

  const validateForm = () => {
    const { email, password } = state;


    if (!validator.isEmail(email)) return false;

    const checks = [ /\w/, /\d/ ].every(a => a.exec(password)) && password.trim().length > 7;
    if (!checks) return false;

    return true;
  }
  
  const submit = () => {
    if (!validateForm()) return;

    const { email, password, name } = state;
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
