import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { selectIsAuth } from '../../redux/slices/authSlice';
import Header from '../Header/Header';
import Spinner from '../Spinner/Spinner';

import styles from './Layout.module.css';

const Layout = (): JSX.Element => {
  const isAuth = useSelector(selectIsAuth);
  const status = useSelector((state: RootState) => state.auth.status);

  const outlet = (
    <div className={`${styles.content} ${!isAuth ? styles.black : null}`}>
      <Outlet />
    </div>
  );

  const spinner = (
    <div className={styles.content}>
      <div className={styles.spinnerBlock}>
        <Spinner width={200} height={200} />
      </div>
    </div>
  );

  return (
    <div className={styles.layout}>
      <Header />
      {status === 'loading' ? spinner : outlet}

      <footer className={styles.footer}>AlexStr @2023</footer>
    </div>
  );
};

export default Layout;
