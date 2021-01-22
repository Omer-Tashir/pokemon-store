import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { BehaviorSubject } from "rxjs";

import { Pokemon } from "../models/pokemon";
import { LoggerService } from "./logger.service";

@Injectable()
export class CartService {
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private localMemoryPokemonsString!: string;

  constructor(private afAuth: AngularFireAuth, private logger: LoggerService) {
    this.afAuth.authState.subscribe(auth => {
      this.isLoggedIn.next(auth != null ?? false);
      if (this.isLoggedIn.getValue() == true && this.localMemoryPokemonsString) {
        this.storeInLocalStorage(this.localMemoryPokemonsString);
      }
      else if (this.isLoggedIn.getValue() == false) {
        this.cleanLocalStorage();
      }
    }, error => {
      this.logger.error(error);
      this.isLoggedIn.next(false);
    });
  }

  getCart() {
    return this.loadCart();
  }

  getLength() {
    return this.getCart().length;
  }

  isInCart(pokemon: Pokemon): boolean {
    return this.getCart().findIndex(p => p.id == pokemon.id) !== -1;
  }

  addPokemon(pokemon: Pokemon): Promise<string> {
    return new Promise((resolve, reject) => {
      let pokemonsInCart = this.getCart();
      if (!this.isInCart(pokemon)) {
        pokemonsInCart.push(pokemon);
        let store = JSON.stringify(pokemonsInCart);
        this.isLoggedIn.getValue() == true ? this.storeInLocalStorage(store) : this.storeInMemory(store);
        resolve("Pokemon has been added successfully");
      }

      reject("Pokemon could not be added");
    });
  }

  removePokemon(pokemon: Pokemon): Promise<void> {
    return new Promise((resolve, reject) => {
      let store = JSON.stringify(this.getCart().filter(p => p.id !== pokemon.id));
      this.isLoggedIn.getValue() == true ? this.storeInLocalStorage(store) : this.storeInMemory(store);
      resolve();
    });
  }

  private loadCart(): Array<Pokemon> {
    if (this.isLoggedIn.getValue() == true || localStorage.getItem('pokemonsInCart')) {
      let load = localStorage.getItem('pokemonsInCart'); 
      return load ? JSON.parse(load) : Array<Pokemon>(); 
    }

    return this.localMemoryPokemonsString ? JSON.parse(this.localMemoryPokemonsString) : Array<Pokemon>(); 
  }

  private cleanLocalStorage() {
    localStorage.removeItem('pokemonsInCart');
  }

  private storeInLocalStorage(store: string) {
    localStorage.setItem('pokemonsInCart', store);
  }

  private storeInMemory(store: string) {
    this.localMemoryPokemonsString = store;
  }
}
