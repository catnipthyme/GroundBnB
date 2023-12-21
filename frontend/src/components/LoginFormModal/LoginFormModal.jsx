import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal'
import './LoginFormModal.css'

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors("");
    return dispatch(sessionActions.thunkLogin({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
          setErrors(data.message);

        }
      });
  };

  const demoUserLogin = () => {
    setCredential("DemoUser1");
    setPassword("password1")
  }

  return (
    <div className='logInModal'>
      <h1>Log In</h1>
      <form className='logInFormModal' onSubmit={handleSubmit}>
        <label>
          <input
            placeholder='Username or Email'
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors && <p className='nope'>{errors}</p>}
        <button
          type="submit"
          disabled={credential.length < 4 || password.length < 6}
          >
            Log In
          </button>
          <button
            className='demoUserButton'
            type="submit"
            onClick={demoUserLogin}
          >
            Demo User
          </button>
      </form>


    </div>
  );
}

export default LoginFormModal;
