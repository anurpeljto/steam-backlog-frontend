import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBox } from './profile-box';

describe('ProfileBox', () => {
  let component: ProfileBox;
  let fixture: ComponentFixture<ProfileBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
