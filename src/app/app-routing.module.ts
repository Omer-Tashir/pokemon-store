import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { LoggerService } from './services/logger.service';

export const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent, data: { icon: "catching_pokemon" } },
  { path: 'cart', component: CartComponent, data: { icon: "shopping_cart" } },
  { path: 'login', component: LoginComponent, data: { icon: "face" } }
];

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  ...APP_ROUTES
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router, private logger: LoggerService) {
    this.router.errorHandler = (error: any) => {
      this.logger.error(error);
    };
  }
 }
