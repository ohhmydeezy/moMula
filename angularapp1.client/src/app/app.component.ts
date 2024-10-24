import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginSuccess } from './auth/auth.actions';
import { showSpinner } from './state/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'angularapp1.client';

  #store = inject(Store);

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.#store.dispatch(loginSuccess(user));
  }
}
