import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { ApiClientService } from './api-client.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Pokemon } from './pokemon-types';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemonList = new BehaviorSubject<Pokemon[]>([]);
  PokemonList$ = this.pokemonList.asObservable();
  private pokemonsSub = new Subscription();

  constructor(private logger: LoggerService, private apiClient: ApiClientService) { }

  public init() {
    this.pokemonsSub = this.apiClient.getPokemons().subscribe(response => 
      {
        if(response !== undefined) {
          this.pokemonList.next(response);
          this.logger.info(`Got ${response.length} pokemons`)
          this.pokemonsSub.unsubscribe();
        }
      });
  }
}
