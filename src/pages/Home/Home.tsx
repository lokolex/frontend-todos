import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '../../redux/store';
import { selectIsAuth } from '../../redux/slices/authSlice';
import { fetchTodos } from '../../redux/slices/todosSlice';
import TodoForm from '../../components/TodoForm/TodoForm';
import TodoList from '../../components/TodoList/TodoList';
import accessDenied from './access-denied.webp';

import styles from './Home.module.css';

const Home = (): JSX.Element => {
  const isAuth = useSelector(selectIsAuth);
  const todos = useSelector((state: RootState) => state.todos.todoList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchTodos());
    }
    // eslint-disable-next-line
  }, [isAuth]);

  if (!isAuth) {
    return (
      <>
        <h3 className={styles.info}>Для того чтобы начать работу войдите или авторизуйтесь</h3>
        <div className={styles.img}>
          <img src={accessDenied} alt="Access denied" />
        </div>
      </>
    );
  }

  return (
    <>
      <TodoForm />
      <TodoList todos={todos} />
    </>
  );
};

export default Home;
