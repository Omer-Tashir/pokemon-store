import { Component, Input, OnInit, Output } from '@angular/core';
import { LoggerService } from '../services/logger.service';
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

  constructor(private cartService: CartService, private logger: LoggerService) {
    this.pokemonsInCart = this.cartService.getCart();
  }

  addToCart(pokemon: Pokemon) {
    this.isLoading = true;
    this.logger.info(`Adding ${pokemon.name}`);
    this.cartService.addPokemon(pokemon).then(() => {
      pokemon.isDisabled = true;
      this.isLoading = false;
    }).catch(error => {
      this.logger.error(error);
      this.isLoading = false;
    });
  }

  removeFromCart(pokemon: Pokemon) {
    this.logger.info(`Removing ${pokemon.name}`);
    this.cartService.removePokemon(pokemon).then(() => {
      this.removePokemonSubscriber.next(pokemon);
    }).catch(error => {
      this.logger.error(error);
    });
  }
  
  setDefaultPic(pokemon: Pokemon) {
    this.logger.debug(`Setting default image for ${pokemon.name}`);
    pokemon.sprite = "assets/default.png";
  }

  ngOnInit(): void {
  }
}
