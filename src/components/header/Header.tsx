import './styles.sass'

import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import {useStore} from "../../context/StoreContext";

interface HeaderProps {
    position: string,
    companyName: string
}

const Header = ({ position, companyName }: HeaderProps) => {
  const { auth } = useStore()
  const theme = useContext(ThemeContext)

  return (
    <header className={`header ${position} ${theme.theme}`}>
      <div className="logo">
        <img src="/icons/logo.svg" alt="logo" />
      </div>
      <div className="title">{companyName}</div>
      <div className="controls">
        <button className="theme btn" onClick={theme.toggleTheme}>
          <img src="/icons/theme.svg" alt="change theme" className='icon' />
        </button>
        {auth.isAuth && (
          <button className="notif btn">
            <img src="/icons/notification.svg" alt="notifications" className='icon' />
          </button>)}
      </div>
      {auth.isAuth && (
        <div className="admin">
          <div className="avatar">
            <img src="/images/admin-avatar.png" alt="avatar" />
          </div>
          <div className="name">Admin</div>
        </div>
      )}
      {/* //<div className="logout"><Button onPress={() => { store.logout().then() }} label="LOGOUT" /></div> */}
    </header>
  );
};

export default Header;
