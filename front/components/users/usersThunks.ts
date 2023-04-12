import {createAsyncThunk} from '@reduxjs/toolkit';
import {GlobalError, LoginMutation, RegisterMutation, RegisterResponse, User} from '../../types';
import axiosApi from '../../axiosApi';
import {isAxiosError} from 'axios';
import {unsetUser} from './usersSlice';

export const register = createAsyncThunk<User, RegisterMutation>(
  'users/register',
  async (user) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('/users', user);
      return response.data.user;
    } catch (e) {
      throw e;
    }
  },
);

export const login = createAsyncThunk<User, LoginMutation, { rejectValue: GlobalError }>(
  'users/login',
  async (loginMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('/users/sessions', loginMutation);
      return response.data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  },
);

export const logout = createAsyncThunk('users/logout', async (_, { dispatch }) => {
  await axiosApi.delete('/users/sessions');
  dispatch(unsetUser());
});

export const googleLogin = createAsyncThunk<User, string, { rejectValue: GlobalError }>(
  'users/googleLogin',
  async (credential, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('/users/google', { credential });
      console.log(response.data.user);
      return response.data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  },
);
