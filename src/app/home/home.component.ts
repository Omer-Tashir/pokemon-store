import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Pokemon } from '../models/pokemon';
import { CartService } from '../services/cart.service';
import { PokedexService } from '../services/pokedex.service';
import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
export class HomeComponent implements OnInit {
  pokemonArr: Pokemon[] = [];
  noMoreResults: boolean = false;
  isLoading: boolean = false;
  error: boolean = false;
  totalSize: number = 0;

  constructor(private pokedexService: PokedexService, private cartService: CartService, private logger: LoggerService) {}

  loadMore() {
    this.isLoading = true;
    this.logger.debug(`Loading pokemons from API, current: ${this.pokemonArr.length}`);
    this.pokedexService.getPokemon(this.pokemonArr.length, 9)
      .then(result => {
        this.noMoreResults = !result?.hasNext ?? false;
        this.totalSize = result?.count ?? 0;

        if (result?.results) {
          result = result?.results?.map((p: Pokemon) => {
            p.imageLoaded = false;
            p.isDisabled = this.cartService.isInCart(p);
            return p;
          });

          this.pokemonArr = this.pokemonArr.concat(result);
          this.logger.debug(`Load has finished, current: ${this.pokemonArr.length}, hasNext: ${!this.noMoreResults}, totalSize: ${this.totalSize}`);
        }

        this.isLoading = false;
        this.error = false;
      })
      .catch((error) => {
        this.logger.error(error);
        this.error = true;
        this.isLoading = false;
      });
  }

  trackByFn(index: any, item: any) {
    return item.id ?? index;
  }

  ngOnInit(): void {
    this.loadMore();
  }
}
