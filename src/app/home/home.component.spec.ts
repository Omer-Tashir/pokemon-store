import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

import { HomeComponent } from './home.component';
import { AppComponent } from '../app.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let pokedexServiceSpy: jasmine.SpyObj<PokedexService>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    const pokedexService = jasmine.createSpyObj('PokedexService', ['getPokemon']);
    const cartService = jasmine.createSpyObj('CartService', ['isInCart']);

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent,
        PokemonCardItemComponent,
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CustomMaterialModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule
      ],
      providers: [
        LoggerService,
        { provide: PokedexService, useValue: pokedexService },
        { provide: CartService, useValue: cartService },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    
    fixture = TestBed.createComponent(HomeComponent);
    pokedexServiceSpy = TestBed.inject(PokedexService) as jasmine.SpyObj<PokedexService>; 
    pokedexServiceSpy.getPokemon.and.returnValue(new Promise((resolve, rejected) => {
      resolve({});
    }));
    
    cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>; 
    cartServiceSpy.isInCart.and.returnValue(false);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get list of pokemons after calling the API', fakeAsync(() => {
    pokedexServiceSpy.getPokemon.and.returnValue(new Promise((resolve, rejected) => {
      resolve({
        results: [
          { "id": 1, "name": "bulbasaur", "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png", "imageLoaded": true },
          { "id": 2, "name": "ivysaur", "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png", "imageLoaded": true },
          { "id": 3, "name": "venusaur", "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png", "imageLoaded": true},
        ],
        count: 3,
        hasNext: true
      });
    }));

    component.ngOnInit();
    tick();

    fixture.detectChanges();
    expect(component.pokemonArr.length).toBe(3);
    expect(component.pokemonArr[0].isDisabled).toBe(false);
    expect(component.pokemonArr[1].isDisabled).toBe(false);
    expect(component.pokemonArr[2].isDisabled).toBe(false);
    
    expect(component.error).toBe(false);
    expect(component.isLoading).toBe(false);
  }));

  it('should handle exception after calling the API', fakeAsync(() => {
    pokedexServiceSpy.getPokemon.and.returnValue(new Promise((resolve, rejected) => {
      rejected("Some error from the server");
    }));

    component.ngOnInit();
    tick();

    fixture.detectChanges();
    expect(component.pokemonArr.length).toBe(0);
    expect(component.error).toBe(true);
    expect(component.isLoading).toBe(false);
  }));
});
