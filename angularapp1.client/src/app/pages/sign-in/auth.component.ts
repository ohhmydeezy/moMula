import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { clearError, login } from '../../auth/auth.actions';
import { selectAuthState, selectError } from '../../auth/auth.selector';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { loginRequestDto } from '../../models/loginRequestDto';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  #store = inject(Store);

  AuthData$ = this.#store.select(selectAuthState);
  errorMessage$ = this.#store.selectSignal(selectError);

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.#store.dispatch(clearError());
  }

  login(): void {
    const result: loginRequestDto = this.loginForm.value;
    this.#store.dispatch(login({ loginRequestDto: result }));
  }
}
