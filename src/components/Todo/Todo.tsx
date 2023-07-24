import { RiCloseFill, RiCheckFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';

import { useAppDispatch } from '../../redux/store';
import { editTodoDone, removeTodo, TodosStatus } from '../../redux/slices/todosSlice';
import { getDate } from '../../utils/getDate';
import Spinner from '../Spinner/Spinner';

import styles from './Todo.module.css';

interface ITodo {
  _id: string;
  text: string;
  done: boolean;
  status: TodosStatus;
  createdAt: string;
}

const Todo = ({ _id, text, done, status, createdAt }: ITodo): JSX.Element => {
  const [isClicked, setIsKliked] = useState(true);
  const dispatch = useAppDispatch();

  const date = getDate(createdAt);

  useEffect(() => {
    if (status !== 'loading') {
      setIsKliked(false);
    }
  }, [status]);

  const onClickCheckTodo = () => {
    dispatch(editTodoDone({ id: _id, value: { done: !done } }));
  };

  const removeTodoHandler = (id: string) => {
    dispatch(removeTodo(id));
  };

  const checkOnClick = () => {
    setIsKliked(true);
  };

  const spinner = (
    <div className={styles.spinnerBlock}>
      <Spinner width={28} height={28} />
    </div>
  );

  return (
    <div onClick={checkOnClick} className={styles.todo}>
      <div className={done ? `${styles.text} ${styles.completed}` : styles.text}>{text}</div>
      {status === 'loading' && isClicked && spinner}
      <div className={styles.date}>{date}</div>
      <RiCheckFill className={styles.check} onClick={onClickCheckTodo} />
      <RiCloseFill className={styles.close} onClick={() => removeTodoHandler(_id)} />
    </div>
  );
};

export default Todo;
