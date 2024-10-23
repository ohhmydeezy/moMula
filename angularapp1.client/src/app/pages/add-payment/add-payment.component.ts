import { Component, inject, OnInit } from '@angular/core';
import { Card } from '../../models/card';
import { userTransaction } from '../../models/userTransactionDto';
import { Store } from '@ngrx/store';
import { addPayment } from '../../state/app.actions';
import { selectDataError, selectUser } from '../../state/app.selectors';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { clearError } from '../../auth/auth.actions';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrl: './add-payment.component.css',
})
export class AddPaymentComponent  implements OnInit {

  #store = inject(Store);
  user$ = this.#store.selectSignal(selectUser);
  cards: Card[] | null | undefined;
  errorMessage$ = this.#store.selectSignal(selectDataError);

  paymentForm: FormGroup = new FormGroup({
    cardId: new FormControl(1, [Validators.required]),
    month: new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(9)]),
    balanceChange: new FormControl('', [Validators.required, this.zeroNotAllowedValidator]),
  });

  ngOnInit(): void {
    this.getCards();
    this.#store.dispatch(clearError());
  }

  addPayment() {
    const result: userTransaction = this.paymentForm.value;
    this.#store.dispatch(addPayment({ payment: result }));
  }

  getCards() {
    this.cards = this.user$()?.cards;
  }

  zeroNotAllowedValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value
    if(value === 0) {
      return { zeroNotAllowed: true}
    }
    return null
  }
}
