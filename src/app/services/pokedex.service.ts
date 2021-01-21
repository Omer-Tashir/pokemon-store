import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable()
export class PokedexService {
  constructor() { }

  getPokemon(offset: number, limit: number) {
    this.fetchFromAPI(offset, limit).then(response => {
      if (response) {
        console.log(response);
      }
    }, error => {
        console.log(error);
    });

    // return this.http.get(`${environment.pokemonAPI}?offset=${offset}&limit=${limit}`)
    //   .toPromise()
    //   .then(response => response.json().results)
    //   .then(items => items.map((item, idx) => {
    //     const id: number = idx + offset + 1;
    //     return {
    //       id,
    //       name: item.name,
    //       sprite: `${environment.pokemonSpriteAPI}${id}.png`
    //     };
    //   }));
  }

  private async fetchFromAPI(offset: number, limit: number): Promise<any> {
    const response = await fetch(`${environment.pokemonAPI}?offset=${offset}&limit=${limit}`);
    return await response.json();
  }
}
