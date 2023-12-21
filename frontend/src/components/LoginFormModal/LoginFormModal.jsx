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
        console.log(data)
        console.log("hey this is data: ", data.message)
        if (data && data.message) {
          setErrors(data.message);
          console.log("errors time: ", errors)
        }
      });

  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors && <p>{errors}</p>}
        <button
          type="submit"
          disabled={credential.length < 4 || password.length < 6}
          >
            Log In
          </button>
      </form>
    </>
  );
}

export default LoginFormModal;
