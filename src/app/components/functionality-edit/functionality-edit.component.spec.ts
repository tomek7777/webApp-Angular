import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalityEditComponent } from './functionality-edit.component';

describe('FunctionalityEditComponent', () => {
  let component: FunctionalityEditComponent;
  let fixture: ComponentFixture<FunctionalityEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionalityEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctionalityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
