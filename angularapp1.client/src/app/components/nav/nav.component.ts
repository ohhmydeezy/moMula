import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../../auth/auth.selector';
import { UserState } from '../../state/app.reducer';
import { logout } from '../../auth/auth.actions';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          height: '100px',
          opacity: 0.8,
        })
      ),
      transition('open => closed', [animate('1s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
  ],
})
export class NavComponent {
  #router = inject(Router);
  #store = inject(Store<UserState>);
  user$ = this.#store.selectSignal(selectAuthUser);
  showMenu = false;
  faBars = faBars;

  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }

  handleButtonClick() {
    if (this.user$()) {
      this.#router.navigate(['/dashboard']);
    } else {
      this.#router.navigate(['']);
    }
  }
  logout() {
    this.#store.dispatch(logout());
  }
}
