import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsAuth, fetchLogin, IFetchLoginArgs, IUser } from '../redux/slices/authSlice';
import Container from '../components/Container/Container';

import styles from './LoginAndReg.module.css';
import { useAppDispatch } from '../redux/store';

const SignupSchema = Yup.object({
  email: Yup.string().email('Введите валидный email').required('Обязательное поле'),
  password: Yup.string().min(5, 'Не менее 5-ти символов').required('Обязательное поле'),
});

const Login = (): JSX.Element => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  if (isAuth) {
    return <Navigate to="/" />;
  }

  const loginHandler = async (params: IFetchLoginArgs) => {
    const data = await dispatch(fetchLogin(params));

    if (!data.payload) {
      return alert('Не удалось войти!');
    }

    if ('token' in (data.payload as IUser)) {
      window.localStorage.setItem('token', (data.payload as IUser).token);
    }
  };

  return (
    <Container>
      <div className={styles.register}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={SignupSchema}
          onSubmit={(values, { resetForm }) => {
            loginHandler(values);
            resetForm();
          }}
        >
          <Form className={styles.form}>
            <div className={styles.title}>Вход</div>
            <div className={styles.subtitle}>Давайте войдем и уже начнем работать!</div>

            <div className={`${styles['input-container']} ${styles.ic1}`}>
              <Field name="email" type="email" className={styles.input} placeholder=" " />
              <div className={styles.cut}></div>
              <label htmlFor="email" className={styles.placeholder}>
                Ваш email:
              </label>
              <ErrorMessage name="email" component="div" className={styles.error} />
            </div>

            <div className={`${styles['input-container']} ${styles.ic1}`}>
              <Field name="password" type="password" className={styles.input} placeholder=" " />
              <div className={`${styles.cut} ${styles['cut-short']}`}></div>
              <label htmlFor="password" className={styles.placeholder}>
                Пароль:
              </label>
              <ErrorMessage name="password" component="div" className={styles.error} />
            </div>

            <button type="submit" className={styles.submit}>
              Войти
            </button>
          </Form>
        </Formik>
      </div>
    </Container>
  );
};

export default Login;
