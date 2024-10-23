import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddCardComponent } from './pages/add-card/add-card.component';
import { AddPaymentComponent } from './pages/add-payment/add-payment.component';
import { BreakdownComponent } from './pages/breakdown/breakdown.component';
import { AuthComponent } from './pages/sign-in/auth.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { SavingsComponent } from './pages/savings/savings.component';

const routes: Routes = [
  {path: "", component: HomeComponent, }, 
  {path: "sign-in", component: AuthComponent},
  {path: "register", component: RegisterComponent},
  {path: "dashboard", component: DashboardComponent},
  {path: "add-card", component: AddCardComponent},
  {path: "add-payment", component: AddPaymentComponent},
  {path: "breakdown/:cardId", component:BreakdownComponent},
  {path: "about-us", component: AboutUsComponent},
  {path: "savings", component: SavingsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
