import { Component, Input, OnInit, Output } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Pokemon } from '../models/pokemon';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'pokemon-card-item',
  templateUrl: './pokemon-card-item.component.html',
  styleUrls: ['./pokemon-card-item.component.css']
})
export class PokemonCardItemComponent implements OnInit {
  @Output() removePokemonSubscriber: ReplaySubject<Pokemon> = new ReplaySubject<Pokemon>();
  @Input() removeEnabled!: boolean;
  @Input() addEnabled!: boolean;
  @Input() pokemon!: Pokemon;

  pokemonsInCart: Array<Pokemon> = new Array<Pokemon>();
  isLoading: boolean = false;

  constructor(private cartService: CartService) {
    this.pokemonsInCart = this.cartService.getCart();
  }

  addToCart(pokemon: Pokemon) {
    this.isLoading = true;
    this.cartService.addPokemon(pokemon).then(() => {
      pokemon.isDisabled = true;
      this.isLoading = false;
    }).catch(error => {
      console.log(error);
      this.isLoading = false;
    });
  }

  removeFromCart(pokemon: Pokemon) {
    this.cartService.removePokemon(pokemon).then(() => {
      this.removePokemonSubscriber.next(pokemon);
    }).catch(error => {
      console.log(error);
    });
  }
  
  setDefaultPic(pokemon: Pokemon) {
    pokemon.sprite = "assets/default.png";
  }

  ngOnInit(): void {
  }
}
