import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CustomMaterialModule } from './core/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { PokemonCardItemComponent } from './pokemon-card-item/pokemon-card-item.component';
import { WarningDialogComponent } from './core/warning-dialog/warning-dialog.component';

import { PokedexService } from './services/pokedex.service';
import { CartService } from './services/cart.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    LoginComponent,
    PokemonCardItemComponent,
    WarningDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  entryComponents: [
    WarningDialogComponent
  ],
  providers: [PokedexService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
