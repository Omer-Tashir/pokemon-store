import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { AppComponent } from '../app.component';
import { AppRoutingModule } from '../app-routing.module';
import { CustomMaterialModule } from '../core/material.module';

import { PokemonCardItemComponent } from './pokemon-card-item.component';
import { Pokemon } from '../models/pokemon';

import { CartService } from '../services/cart.service';
import { LoggerService } from '../services/logger.service';
import { environment } from '../../environments/environment';

describe('PokemonCardItemComponent', () => {
  let component: PokemonCardItemComponent;
  let fixture: ComponentFixture<PokemonCardItemComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  
  beforeEach(async () => {
    const cartService = jasmine.createSpyObj('CartService', ['addPokemon', 'removePokemon']);

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
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
        { provide: CartService, useValue: cartService },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    
    fixture = TestBed.createComponent(PokemonCardItemComponent);
    cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;

    cartServiceSpy.addPokemon.and.returnValue(new Promise((resolve, reject) => {
      resolve("Pokemon has been added successfully");
    }));

    cartServiceSpy.removePokemon.and.returnValue(new Promise((resolve, reject) => {
      resolve();
    }));
    
    component = fixture.componentInstance;
    component.pokemon = new Pokemon;
    component.removeEnabled = true;
    component.addEnabled = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to add pokemon to the cart', fakeAsync(() => {
    let pokemon: Pokemon = Object.assign(new Pokemon, { "id": 1, "name": "bulbasaur", "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png", "imageLoaded": true, "isDisabled": false });
    component.addToCart(pokemon);
    tick();

    fixture.detectChanges();
    expect(pokemon.isDisabled).toBeTrue();
    expect(component.isLoading).toBeFalse();
  }));

  it('should be able to remove pokemon from the cart', fakeAsync(() => {
    let pokemon: Pokemon = Object.assign(new Pokemon, { "id": 1, "name": "bulbasaur", "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png", "imageLoaded": true, "isDisabled": false });
    let removePokemonSubscriberSpy = spyOn(component.removePokemonSubscriber, 'next');
    component.removeFromCart(pokemon);
    tick();

    fixture.detectChanges();
    expect(removePokemonSubscriberSpy).toHaveBeenCalled();
    expect(component.isLoading).toBeFalse();
  }));
});
