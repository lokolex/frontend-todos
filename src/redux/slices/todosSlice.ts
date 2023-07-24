import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

//types
export interface ITodo {
  createdAt: string;
  done: boolean;
  text: string;
  updatedAt: string;
  _id: string;
}

export enum TodosStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface ITodosState {
  todoList: ITodo[];
  status: TodosStatus;
}

export interface IPostTodoArgs {
  text: string;
}

export interface IEditTodoDoneArgs {
  id: string;
  value: {
    done: boolean;
  };
}

// async thunks
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const { data } = await axios.get<ITodo[]>('/todos');
  return data as ITodo[];
});

export const postTodo = createAsyncThunk('todos/postTodo', async (value: IPostTodoArgs) => {
  const { data } = await axios.post<ITodo[]>('/todos', value);
  return data as ITodo[];
});

export const removeTodo = createAsyncThunk('todos/removeTodo', async (id: string) => {
  const { data } = await axios.delete<ITodo[]>(`/todos/${id}`);
  return data as ITodo[];
});

export const editTodoDone = createAsyncThunk(
  'todos/editTodoDone',
  async (params: IEditTodoDoneArgs) => {
    const { id, value } = params;
    const { data } = await axios.patch<ITodo[]>(`/todos/editDone/${id}`, value);
    return data as ITodo[];
  }
);

// todosSlice
const initialState: ITodosState = {
  todoList: [],
  status: TodosStatus.LOADING,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Получение todoList
      .addCase(fetchTodos.pending, (state) => {
        state.todoList = [];
        state.status = TodosStatus.LOADING;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todoList = action.payload;
        state.status = TodosStatus.SUCCESS;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.todoList = [];
        state.status = TodosStatus.ERROR;
      })
      // Отправка todo
      .addCase(postTodo.pending, (state) => {
        state.status = TodosStatus.LOADING;
      })
      .addCase(postTodo.fulfilled, (state, action) => {
        state.todoList = action.payload;
        state.status = TodosStatus.SUCCESS;
      })
      .addCase(postTodo.rejected, (state) => {
        state.todoList = [];
        state.status = TodosStatus.ERROR;
      })
      // Удаление todo
      .addCase(removeTodo.pending, (state) => {
        state.status = TodosStatus.LOADING;
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todoList = action.payload;
        state.status = TodosStatus.SUCCESS;
      })
      .addCase(removeTodo.rejected, (state) => {
        state.todoList = [];
        state.status = TodosStatus.ERROR;
      })
      // Изменение статуса выполнено
      .addCase(editTodoDone.pending, (state) => {
        state.status = TodosStatus.LOADING;
      })
      .addCase(editTodoDone.fulfilled, (state, action) => {
        state.todoList = action.payload;
        state.status = TodosStatus.SUCCESS;
      })
      .addCase(editTodoDone.rejected, (state) => {
        state.todoList = [];
        state.status = TodosStatus.ERROR;
      });
  },
});

export default todosSlice.reducer;
