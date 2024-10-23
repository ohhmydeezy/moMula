import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../src/app/models/card';
import { AppUser } from '../src/app/models/appUser';
import { UserDto } from '../src/app/models/userDto';
import { environment } from '../src/environments/environment.development';
import { loginRequestDto } from '../src/app/models/loginRequestDto';
import { addCardRequestDto } from '../src/app/models/addCardRequest';
import { SignUpRequest } from '../src/app/models/registerRequest';
import { SavingsRequest } from '../src/app/models/savingsRequest';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  #http = inject(HttpClient);
  baseUrl = environment.apiURl

  login(model: loginRequestDto ) {
    return this.#http.post<UserDto>(this.baseUrl + 'Account/login', model);
  }

  register(model: SignUpRequest) {
    return this.#http.post<AppUser>(this.baseUrl + 'Account/register', model);
  }

  addCard(model: addCardRequestDto ) {
    return this.#http.post<Card>(this.baseUrl + 'UserCard/add-card', model);
  }

  addSavings(model: SavingsRequest) {
    return this.#http.put<number>(this.baseUrl + 'Account/add-Savings',  model);
  }
 
  getCurrentUserDetails(Id: number) {
    return this.#http.get<AppUser>(this.baseUrl + 'Users/getuserbyid', {params: {Id: Id}});
  }

  deleteCard(Id: number) {
    return this.#http.delete<Card>(this.baseUrl + 'UserCard/delete-card', {params: {Id: Id}});
  }
}
