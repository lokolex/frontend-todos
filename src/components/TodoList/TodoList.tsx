import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import Container from '../Container/Container';
import Todo from '../Todo/Todo';

import styles from './TodoList.module.css';
import { ITodo } from '../../redux/slices/todosSlice';

interface ITodoList {
  todos: ITodo[];
}

const TodoList = ({ todos }: ITodoList): JSX.Element => {
  const status = useSelector((state: RootState) => state.todos.status);

  if (!todos.length && status !== 'loading') {
    return <h1 className={styles.info}>У Вас нет задач!</h1>;
  }

  const content = todos.map((todo) => <Todo key={todo._id} {...todo} status={status} />);

  return (
    <div>
      <Container>{content}</Container>
    </div>
  );
};

export default TodoList;
