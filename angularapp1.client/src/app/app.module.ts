import { isDevMode, NgModule } from '@angular/core';
import {
  provideStoreDevtools,
  StoreDevtoolsModule,
} from '@ngrx/store-devtools';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { HeroComponent } from './components/hero/hero.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddCardComponent } from './pages/add-card/add-card.component';
import { CapitalizePipe } from './capitalize.pipe';
import { CardDisplayComponent } from './components/card-display/card-display.component';
import { ChartsComponent } from './components/charts/charts.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { provideStore, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './state/app.reducer';
import { DataEffects } from './state/app.effects';
import { LetDirective } from '@ngrx/component';
import { BreakdownComponent } from './pages/breakdown/breakdown.component';
import { AuthComponent } from './pages/sign-in/auth.component';
import { AuthEffects } from './auth/auth.effects';
import { register } from 'swiper/element/bundle';
import { AddPaymentComponent } from './pages/add-payment/add-payment.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { authReducer } from './auth/auth.reducer';
import { TokenInterceptor } from './jwt.interceptor';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';
import { Base64Pipe } from './conver-base64-img.pipe';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { BreakdownChartComponent } from './charts/breakdown-chart/breakdown-chart.component';
import { SavingsComponent } from './pages/savings/savings.component';
import { YouTubePlayer } from '@angular/youtube-player';
import { ToastrModule } from 'ngx-toastr';
import { provideUserIdleConfig } from 'angular-user-idle';

register();

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    NavComponent,
    HeroComponent,
    RegisterComponent,
    DashboardComponent,
    AddCardComponent,
    AddPaymentComponent,
    CapitalizePipe,
    ChartsComponent,
    TransactionsComponent,
    BreakdownComponent,
    AboutUsComponent,
    CardDisplayComponent,
    LoadingSpinnerComponent,
    Base64Pipe,
    BreakdownComponent,
    BreakdownChartComponent,
    SavingsComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    YouTubePlayer,
    ToastrModule.forRoot(),
    StoreModule.forRoot({ appState: appReducer, authState: authReducer }),
    EffectsModule.forRoot([DataEffects, AuthEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
    LetDirective,
    StoreRouterConnectingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    provideStore({ userState: appReducer, authState: authReducer }),
    provideHttpClient(withInterceptorsFromDi()),
    provideStoreDevtools(),
  ],
  exports: [Base64Pipe],
})
export class AppModule {}
