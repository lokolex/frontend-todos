import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../redux/store';
import { IFetchRegisterArgs, IUser, fetchRegister, selectIsAuth } from '../redux/slices/authSlice';
import Container from '../components/Container/Container';

import styles from './LoginAndReg.module.css';

const SignupSchema = Yup.object({
  userName: Yup.string()
    .min(2, 'Введите не менее 2-х символов')
    .max(15, 'Введите не более 15-ти символов')
    .required('Обязательное поле'),
  email: Yup.string().email('Введите валидный email').required('Обязательное поле'),
  password: Yup.string().min(5, 'Не менее 5-ти символов').required('Обязательное поле'),
});

const Register = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  if (isAuth) {
    return <Navigate to="/" />;
  }

  const registerHandler = async (params: IFetchRegisterArgs) => {
    const data = await dispatch(fetchRegister(params));

    if (!data.payload) {
      return alert('Не удалось зарегистрироваться!');
    }

    if ('token' in (data.payload as IUser)) {
      window.localStorage.setItem('token', (data.payload as IUser).token);
    }
  };

  return (
    <Container>
      <div className={styles.register}>
        <Formik
          initialValues={{ userName: '', email: '', password: '' }}
          validationSchema={SignupSchema}
          onSubmit={(values, { resetForm }) => {
            registerHandler(values);
            resetForm();
          }}
        >
          <Form className={styles.form}>
            <div className={styles.title}>Регистрация</div>
            <div className={styles.subtitle}>Давайте создадим Вашу учетную запись!</div>

            <div className={`${styles['input-container']} ${styles.ic1}`}>
              <Field name="userName" type="text" placeholder=" " className={styles.input} />
              <div className={styles.cut}></div>
              <label htmlFor="userName" className={styles.placeholder}>
                Ваше имя:
              </label>
              <ErrorMessage name="userName" component="div" className={styles.error} />
            </div>

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
              Отправить
            </button>
          </Form>
        </Formik>
      </div>
    </Container>
  );
};

export default Register;
