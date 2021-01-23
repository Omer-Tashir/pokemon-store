import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import { PokemonCardItemComponent } from '../pokemon-card-item/pokemon-card-item.component';
import { CustomMaterialModule } from '../core/material.module';

import { CartService } from '../services/cart.service';
import { LoggerService } from '../services/logger.service';
import { PokedexService } from '../services/pokedex.service';
import { environment } from '../../environments/environment';

import { CartComponent } from './cart.component';
import { AppComponent } from '../app.component';
import { of } from 'rxjs';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  let dialog: MatDialog;

  beforeEach(async () => {
    const cartService = jasmine.createSpyObj('CartService', ['getCart', 'removePokemon']);
    
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CartComponent,
        PokemonCardItemComponent,
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CustomMaterialModule,
        HttpClientTestingModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule
      ],
      providers: [
        MatDialog,
        LoggerService,
        PokedexService,
        { provide: CartService, useValue: cartService },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    dialog = TestBed.inject(MatDialog);

    cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>; 
    cartServiceSpy.getCart.and.returnValue([
      { "id": 3, "name": "venusaur", "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png", "imageLoaded": true, "isDisabled": false },
      { "id": 27, "name": "sandshrew", "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/27.png", "imageLoaded": true, "isDisabled": false },
      { "id": 6, "name": "charizard", "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png", "imageLoaded": true, "isDisabled": false },
      { "id": 5, "name": "charmeleon", "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png", "imageLoaded": true, "isDisabled": false },
      { "id": 38, "name": "ninetales", "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/38.png", "imageLoaded": true, "isDisabled": false },
      { "id": 1, "name": "bulbasaur", "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png", "imageLoaded": true, "isDisabled": false },
      { "id": 2, "name": "ivysaur", "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png", "imageLoaded": true, "isDisabled": false },
      { "id": 36, "name": "clefable", "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/36.png", "imageLoaded": true, "isDisabled": false }
    ]);
    cartServiceSpy.removePokemon.and.returnValue(new Promise((resolve, reject) => {
      resolve();
    }));

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get pokemons in cart', () => {
    component.pokemonsInCart = cartServiceSpy.getCart();
    expect(component.pokemonsInCart).toBeTruthy();
    expect(component.pokemonsInCart.length).toEqual(8);
  });

  it('should be able to remove pokemons from the cart', () => {
    component.pokemonsInCart = cartServiceSpy.getCart();
    expect(component.pokemonsInCart).toBeTruthy();
    expect(component.pokemonsInCart.length).toEqual(8);

    component.removePokemon(component.pokemonsInCart[0]);
    expect(component.pokemonsInCart.length).toEqual(7);
  });

  it('should be able to clear all the pokemons in the cart', fakeAsync(() => {
    component.pokemonsInCart = cartServiceSpy.getCart();
    expect(component.pokemonsInCart).toBeTruthy();
    expect(component.pokemonsInCart.length).toEqual(8);
  
    spyOn(dialog, 'open').and.returnValue({afterClosed: () => of(true)} as MatDialogRef<typeof component>);
    component.clearCart();
    tick();

    fixture.detectChanges();
    expect(component.pokemonsInCart.length).toEqual(0);
  }));
});
