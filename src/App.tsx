import './App.sass'

import React, { useContext, useEffect, useState } from 'react';
import LoginForm from './screens/login/LoginForm';
import Header from './components/header/Header';
import { observer } from 'mobx-react-lite';
import RouterMain from './router/Router';
import Spinner from './components/UI/spinner/Spinner';
import { ThemeContext } from './context/ThemeContext';
import {useStore} from "./context/StoreContext";

function App() {
  const { auth } = useStore()
  const theme = useContext(ThemeContext)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)
    if (localStorage.getItem('token')) {
      auth.checkAuth().then(() => {
        setLoading(false)
      }).catch()
    } else {
      setLoading(false)
    }
  }, [auth])

  return (
    <>
      {!loading ? (
        <>
          {auth.isAuth ? (
            <div className={`RouterSidebar ${theme.theme}`}>
              <RouterMain />
            </div>
          ) : <LoginForm />}
        </>
      ) : (
        <div className="mainLoading">
          <Spinner />
        </div>
      )
      }
    </>
  );
}

export default observer(App);
