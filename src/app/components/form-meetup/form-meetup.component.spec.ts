import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMeetupComponent } from './form-meetup.component';

describe('FormMeetupComponent', () => {
  let component: FormMeetupComponent;
  let fixture: ComponentFixture<FormMeetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMeetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMeetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
