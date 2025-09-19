import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Leaderboards } from './leaderboards';

describe('Leaderboards', () => {
  let component: Leaderboards;
  let fixture: ComponentFixture<Leaderboards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Leaderboards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Leaderboards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
