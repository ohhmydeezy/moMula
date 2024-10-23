import { Component, inject,} from '@angular/core';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { selectUser } from '../../state/app.selectors';
import { selectError } from '../../auth/auth.selector';
import { addSavings } from '../../state/app.actions';
import { SavingsRequest } from '../../models/savingsRequest';

@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrl: './savings.component.css',
})
export class SavingsComponent {
  
  PiggyBank = faPiggyBank;

  model: {
    userId: number;
    amount: number;
  } = {
    userId: 0,
    amount: 0,
  };

  #store = inject(Store);
  user$ = this.#store.selectSignal(selectUser);
  errorMessage$ = this.#store.selectSignal(selectError);

  addSavings(): void {
    const payload: SavingsRequest = {
      userId: this.user$()!.id,
      savings: this.model.amount,
    };
    this.#store.dispatch(addSavings({savingsRequest: payload}));
  }
}
