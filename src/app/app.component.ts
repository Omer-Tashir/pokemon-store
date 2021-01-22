import { Component } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

import { CartService } from './services/cart.service';
import { APP_ROUTES } from '../app/app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class AppComponent {
  navLinks = APP_ROUTES;

  constructor(private cartService: CartService) { }
  
  getCartLength() {
    return this.cartService.getLength();
  }
}
