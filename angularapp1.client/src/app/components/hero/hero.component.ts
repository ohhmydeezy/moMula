import { Component } from '@angular/core';
import {
  faPlus,
  faWallet,
  faCalendarCheck,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent {
  faPlus = faPlus;
  faWallet = faWallet;
  faCalender = faCalendarCheck;
  faMoney = faMoneyBill;
}
