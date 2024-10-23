import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userTransaction } from '../src/app/models/userTransactionDto';
import { environment } from '../src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  #http = inject(HttpClient)
  baseApiUrl = environment.apiURl

  addPayment(paymentDetails: userTransaction): Observable<userTransaction> {
    return this.#http.put<userTransaction>(this.baseApiUrl + `UserCard/add-payment`, paymentDetails);
  }
  
}
