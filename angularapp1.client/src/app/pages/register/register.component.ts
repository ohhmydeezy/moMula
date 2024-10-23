import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { clearError, SignUp } from '../../auth/auth.actions';
import { SignUpRequest } from '../../models/registerRequest';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { selectError } from '../../auth/auth.selector';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  #store = inject(Store<AppState>);
  errorMessage$ = this.#store.selectSignal(selectError);

  registrationForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(70)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    monthlyIncome: new FormControl(0, [Validators.required]),
    savings: new FormControl(0, [Validators.required]),
  });

  ngOnInit(): void {
    this.#store.dispatch(clearError());
  }

  register(): void {
    const result: SignUpRequest = this.registrationForm.value;
    this.#store.dispatch(SignUp({ signUpRequest: result }));
  }
}
