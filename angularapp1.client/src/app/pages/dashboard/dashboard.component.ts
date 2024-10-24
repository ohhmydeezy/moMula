import { Component, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllCards, selectUser } from '../../state/app.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  #store = inject(Store);
  user$ = this.#store.selectSignal(selectUser);
  card$ = this.#store.selectSignal(selectAllCards);


hasTransactions() {
  const cards = this.card$();
    return cards?.some((card) => card?.transactions?.length > 0);
  }
}
