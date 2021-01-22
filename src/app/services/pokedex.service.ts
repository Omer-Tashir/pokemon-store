import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable()
export class PokedexService {
  constructor() { }

  async getPokemon(offset: number, limit: number): Promise<any> {
    const fetchResponse = await this.fetchFromAPI(offset, limit);
    const results = fetchResponse?.results?.map((item: any, idx: number) => {
        const id: number = idx + offset + 1;
        return {
          id,
          name: item.name,
          sprite: `${environment.pokemonSpriteAPI}${id}.png`,
          imageLoaded: false
        };
    });

    return {
      results,
      count: fetchResponse?.count,
      hasNext: fetchResponse?.next != null
    };
  }

  private async fetchFromAPI(offset: number, limit: number): Promise<any> {
    const response = await fetch(`${environment.pokemonAPI}?offset=${offset}&limit=${limit}`);
    return await response.json();
  }
}
