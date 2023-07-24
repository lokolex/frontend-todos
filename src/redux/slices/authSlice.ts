import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { RootState } from '../store';

// types
export interface IUser {
  createdAt: string;
  email: string;
  name: string;
  token: string;
  updatedAt: string;
  _id: string;
}

export enum AuthStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IAuthState {
  user: IUser | null;
  status: AuthStatus;
}

export interface IFetchLoginArgs {
  email: string;
  password: string;
}

export interface IFetchRegisterArgs extends IFetchLoginArgs {
  userName: string;
}

// async thunks
export const fetchLogin = createAsyncThunk<IUser, IFetchLoginArgs>(
  'auth/fetchLogin',
  async (params) => {
    const { data } = await axios.post<IUser>('/auth/login', params);
    return data;
  }
);

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (params: IFetchRegisterArgs) => {
    const { data } = await axios.post<IUser>('/auth/register', params);
    return data as IUser;
  }
);

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await axios.get<IUser>('/auth/me');
  return data as IUser;
});

// authSlice
const initialState: IAuthState = {
  user: null,
  status: AuthStatus.LOADING,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(fetchLogin.pending, (state) => {
        state.user = null;
        state.status = AuthStatus.LOADING;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = AuthStatus.SUCCESS;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.user = null;
        state.status = AuthStatus.ERROR;
      })
      // register
      .addCase(fetchRegister.pending, (state) => {
        state.user = null;
        state.status = AuthStatus.LOADING;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = AuthStatus.SUCCESS;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.user = null;
        state.status = AuthStatus.ERROR;
      })
      // authMe
      .addCase(fetchAuthMe.pending, (state) => {
        state.user = null;
        state.status = AuthStatus.LOADING;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = AuthStatus.SUCCESS;
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.user = null;
        state.status = AuthStatus.ERROR;
      });
  },
});

export const selectIsAuth = (state: RootState) => Boolean(state.auth.user);

export const { logout } = authSlice.actions;

export default authSlice.reducer;
