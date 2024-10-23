import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllCards } from '../../state/app.selectors';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent {
  #store = inject(Store);
  cards$ = this.#store.selectSignal(selectAllCards)

}
