import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCardItemComponent } from './pokemon-card-item.component';

describe('PokemonCardItemComponent', () => {
  let component: PokemonCardItemComponent;
  let fixture: ComponentFixture<PokemonCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonCardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
