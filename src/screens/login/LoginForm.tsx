import './styles.sass'

import React, { FC, useState, FormEvent } from 'react';
import {useStore} from "../../context/StoreContext";
import Background from "./background";

const LoginForm: FC = () => {
  const { auth } = useStore()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isShowPass, setShowPass] = useState<boolean>(false)
  const [isRemembered, setIsRemembered] = useState(false);
  const [error, setError] = useState<string>('')

  function login(e: FormEvent) {
    e.preventDefault();
    auth.login(email, password, isRemembered).catch((e) => {
      console.log(e);
      
      setError(`Incorrect password or email`);
    });
  }

  const handleRememberPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsRemembered(e.target.checked);
  };

  return (
    <div id="loginLayout">
      <Background />
      <div className="login-form">
        <div className="title">С возвращением!</div>
        <form onSubmit={login} className="form">
          <div className="input-group">
            <label htmlFor="email">
              <span className="input-container">
                <span className='label'>Email</span>
                <input className="input" type="text" id='email' onChange={e => setEmail(e.target.value)} value={email}
                />
              </span>
            </label>
            <label htmlFor="password">
              <span className="input-container">
                <span className="label">Пароль</span>
                <input className="input"
                  type={isShowPass ? 'text' : 'password'}
                  id="password"
                  onChange={e => setPassword(e.target.value)}
                  value={password} />
                <span
                  className={`btn-show-pass icon ${isShowPass ? 'show' : ''}`}
                  onClick={() => setShowPass(!isShowPass)}>
                  <img src="/icons/eye.svg" alt="show password" />
                </span>
              </span>
            </label>
          </div>
          <div className="login">
            <label htmlFor="remember" className='checkbox-container'>
            Запомнить меня
              <input type="checkbox" id="remember" onChange={handleRememberPasswordChange}/>
              <span className='checkmark'>
                <img src="/icons/tick.svg" alt="checked" className='tick' />
              </span>
            </label>
            <button className="button" type="submit">Войти</button>
          </div>
        </form>
      </div >
    </div >
  );
};

export default LoginForm;
