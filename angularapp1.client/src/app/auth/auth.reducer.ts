import { createReducer, on } from '@ngrx/store';
import {
  clearError,
  login,
  loginFailure,
  loginSuccess,
  logout,
  SignUpFailure,
  SignUpSuccess,
} from './auth.actions';
import { UserDto } from '../models/userDto';

export interface AuthState {
  user: UserDto | undefined;
  isAuthenticated: boolean;
  errorMessage: string | undefined;
  loading: boolean;
}

const initialState: AuthState = {
  user: undefined,
  isAuthenticated: false,
  errorMessage: undefined,
  loading: true,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => ({
    ...state,
    loading: true,
  })),
  on(clearError, (state) => ({
    ...state,
    errorMessage: undefined,
  })),
  on(loginSuccess, (state, { user }) => {
    return {
      ...state,
      user: user,
      isAuthenticated: true,
      errorMessage: undefined,
      loading: false,
    };
  }),
  on(loginFailure, (state) => {
    return {
      ...state,
      user: undefined,
      isAuthenticated: false,
      errorMessage: 'Email Or Password is Incorrect',
      loading: false,
    };
  }),

  on(SignUpSuccess, (state) => ({
    ...state,
    user: undefined,
    isAuthenticated: false,
    errorMessage: undefined,
    loading: false
  })),

  on(SignUpFailure, (state) => {
    return {
      ...state,
      user: undefined,
      isAuthenticated: false,
      errorMessage: 'Essential Credentials Missing',
      loading: false,
    };
  }),

  on(logout, (state) => ({
    ...state,
    user: undefined,
    isAuthenticated: false,
  }))
);
