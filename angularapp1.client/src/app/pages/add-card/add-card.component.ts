import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addCard } from '../../state/app.actions';
import { selectError } from '../../auth/auth.selector';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { addCardRequestDto } from '../../models/addCardRequest';
import { selectDataError } from '../../state/app.selectors';
import { clearError } from '../../auth/auth.actions';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrl: './add-card.component.css',
})
export class AddCardComponent implements OnInit {
  #store = inject(Store);
  errorMessage$ = this.#store.selectSignal(selectError);
  userError$ = this.#store.selectSignal(selectDataError)

  addCardForm: FormGroup = new FormGroup({
    accountName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(35)]),
    openingBalance: new FormControl(0, [Validators.required, Validators.min(1)]),
  });

  ngOnInit(): void {
    this.#store.dispatch(clearError());
  }


  addCard() {
    const result: addCardRequestDto = this.addCardForm.value;
    this.#store.dispatch(addCard({ addCardRequestDto: result }));
  }
}
