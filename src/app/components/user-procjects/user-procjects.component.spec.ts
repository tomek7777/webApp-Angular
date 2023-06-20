import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProcjectsComponent } from './user-procjects.component';

describe('UserProcjectsComponent', () => {
  let component: UserProcjectsComponent;
  let fixture: ComponentFixture<UserProcjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProcjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProcjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
