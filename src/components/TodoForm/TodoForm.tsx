import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { RootState, useAppDispatch } from '../../redux/store';
import { IPostTodoArgs, postTodo } from '../../redux/slices/todosSlice';
import Container from '../Container/Container';
import Spinner from '../Spinner/Spinner';

import styles from './TodoForm.module.css';

const SignupSchema = Yup.object({
  text: Yup.string()
    .min(5, 'Минимум 5 символов')
    .max(100, 'Максимум 100 символов')
    .trim('Введите текст')
    .required('Введите текст'),
});

const TodoForm = (): JSX.Element => {
  const [isClicked, setIsKliked] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const status = useSelector((state: RootState) => state.todos.status);

  useEffect(() => {
    if (status !== 'loading') {
      setIsKliked(false);
    }
  }, [status]);

  const addTodoHandler = (data: IPostTodoArgs) => {
    dispatch(postTodo(data));
  };

  const checkOnClick = () => {
    setIsKliked(true);
  };

  const spinner = (
    <div className={styles.spinner}>
      <Spinner width={30} height={30} />
    </div>
  );

  return (
    <Container>
      <div className={styles.todoForm}>
        <Formik
          initialValues={{ text: '' }}
          validationSchema={SignupSchema}
          onSubmit={(values, { resetForm }) => {
            addTodoHandler(values);
            resetForm();
          }}
        >
          <Form className={styles.form}>
            <div className={styles.inputWrapper}>
              {status === 'loading' && isClicked && spinner}
              <Field
                name="text"
                type="text"
                className={styles.text}
                placeholder="Введите новую задачу"
              />
              <ErrorMessage name="text" component="div" className={styles.error} />
            </div>
            <div className={styles.button}>
              <button
                onClick={checkOnClick}
                disabled={status === 'loading' && isClicked}
                type="submit"
              >
                Добавить
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </Container>
  );
};

export default TodoForm;
