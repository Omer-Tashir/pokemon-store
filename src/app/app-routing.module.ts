import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';

export const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent, data: { icon: "home" } },
  { path: 'cart', component: CartComponent, data: { icon: "cart" } },
  { path: 'login', component: LoginComponent, data: { icon: "login" } }
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
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      console.log(error);
    };
  }
 }
