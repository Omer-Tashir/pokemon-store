import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PokemonCardItemComponent } from './pokemon-card-item/pokemon-card-item.component';
import { WarningDialogComponent } from './core/warning-dialog/warning-dialog.component';
import { CustomMaterialModule } from './core/material.module';

import { CartService } from './services/cart.service';
import { environment } from '../environments/environment';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
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
      providers: [
        CartService,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
