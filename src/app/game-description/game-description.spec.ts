import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDescription } from './game-description';

describe('GameDescription', () => {
  let component: GameDescription;
  let fixture: ComponentFixture<GameDescription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDescription]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDescription);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
