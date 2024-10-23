import { createAction, props } from '@ngrx/store';
import { UserDto } from '../models/userDto';
import { AppUser } from '../models/appUser';
import { SignUpRequest } from '../models/registerRequest';
import { loginRequestDto } from '../models/loginRequestDto';

export const login = createAction(
  '[Auth] Login',
  props<{ loginRequestDto: loginRequestDto }>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: UserDto; redirect: boolean }>()
);

export const loginFailure = createAction(
  '[Auth] login Failure',
  props<{ message: string }>()
);

export const logout = createAction('[Auth] Logout');
export const clearError = createAction('[Error] Clear Error');

export const SignUp = createAction(
  '[Auth] SignUp',
  props<{ signUpRequest: SignUpRequest }>()
);

export const SignUpSuccess = createAction(
  '[Auth] SignUp Success',
  props<{ payload: AppUser }>()
);
export const SignUpFailure = createAction(
  '[Auth] SignUp Failure',
  props<{ message: string }>()
);



