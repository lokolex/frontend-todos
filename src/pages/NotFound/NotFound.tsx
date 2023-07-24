import { Link } from 'react-router-dom';

import iconError from './error-404.gif';

import styles from './NotFound.module.css';

const NotFound = (): JSX.Element => {
  return (
    <>
      <h1 className={styles.title}>Страница не найдена!</h1>
      <div className={styles.img}>
        <img src={iconError} alt="Page not found" />
      </div>
      <div className={styles.link}>
        <Link to="/">На главную</Link>
      </div>
    </>
  );
};

export default NotFound;
