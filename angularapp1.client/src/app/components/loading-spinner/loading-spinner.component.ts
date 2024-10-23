import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectDataLoading } from '../../state/app.selectors';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.css',
})
export class LoadingSpinnerComponent {
  #store = inject(Store);

  loading$ = this.#store.selectSignal(selectDataLoading)

}
