import styles from './Container.module.css';

type TContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: TContainerProps): JSX.Element => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
