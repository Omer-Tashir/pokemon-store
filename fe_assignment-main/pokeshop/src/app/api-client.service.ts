import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon, PokemonsResponse } from './pokemon-types';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  private maxItems = 30;

  // API Docs: https://pokeapi.co/docs/v2#pokemon

  constructor(private logger: LoggerService, private httpClient: HttpClient) {
  }

  public getPokemons(): Observable<Pokemon[]> {
    this.logger.info('fetching pokemons');
    return this.httpClient.get<PokemonsResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${this.maxItems}`)
                          .pipe(map(res => res.results));
  }
}
