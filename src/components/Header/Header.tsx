import { Link, NavLink } from 'react-router-dom';
import { FcBusinessman } from 'react-icons/fc';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../redux/store';
import { selectIsAuth, logout } from '../../redux/slices/authSlice';
import Container from '../Container/Container';

import styles from './Header.module.css';

const Header = (): JSX.Element => {
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  const [toggleLinks, setToggleLinks] = useState<boolean>(false);
  return (
    <header className={styles.header}>
      <Container>
        <nav>
          <div className={styles.logo}>
            <Link to="/">AlexStr-ToDo</Link>
          </div>
          <div
            onClick={() => setToggleLinks(!toggleLinks)}
            className={toggleLinks ? `${styles.hamburger} ${styles.toggle}` : `${styles.hamburger}`}
          >
            <div className={styles.bars1}></div>
            <div className={styles.bars2}></div>
            <div className={styles.bars3}></div>
          </div>
          <ul className={toggleLinks ? `${styles.navLinks} ${styles.open}` : `${styles.navLinks}`}>
            {isAuth ? (
              <>
                <li onClick={() => setToggleLinks(!toggleLinks)}>
                  <div className={styles.userContainer}>
                    <FcBusinessman className={styles.icon} />
                    <h2 className={styles.nickname}>{user?.name}</h2>
                  </div>
                </li>

                <li onClick={() => setToggleLinks(!toggleLinks)}>
                  <Link onClick={logoutHandler} to="#">
                    Выйти
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li onClick={() => setToggleLinks(!toggleLinks)}>
                  <NavLink to="login">Войти</NavLink>
                </li>
                <li onClick={() => setToggleLinks(!toggleLinks)}>
                  <NavLink to="register">Создать аккаунт</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
