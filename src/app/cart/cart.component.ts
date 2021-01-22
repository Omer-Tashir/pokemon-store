import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';

import { Pokemon } from '../models/pokemon';
import { CartService } from '../services/cart.service';
import { WarningDialogComponent } from '../core/warning-dialog/warning-dialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(200 )
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(200, style({opacity: 0})))
    ])
  ]
})
export class CartComponent {
  pokemonsInCart: Array<Pokemon> = new Array<Pokemon>();
  isLoading: boolean = false;
  
  constructor(private cartService: CartService, private dialog: MatDialog) {
    this.pokemonsInCart = this.cartService.getCart();
  }

  removePokemon(pokemon: Pokemon) {
    const index = this.pokemonsInCart.findIndex(p => p.id == pokemon.id);
    if (index !== -1) {
      this.pokemonsInCart.splice(index, 1);
    }
  }

  clearCart() {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      data: {
        title: 'Are you sure about it?',
        message: `Your cart will be cleaned`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => { 
      if (result) {
        let removeStack = this.pokemonsInCart.map(p => {
          return this.cartService.removePokemon(p);
        });

        this.isLoading = true;
        Promise.all(removeStack).then(() => {
          this.pokemonsInCart = [];
          this.isLoading = false;
        }).catch(error => {
          console.log(error);
          this.isLoading = false;
        }); 
      }
    });
  }
}
