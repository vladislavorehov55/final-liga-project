import { TestBed } from '@angular/core/testing';

import { FormMeetupService } from './form-meetup.service';

describe('FormMeetupService', () => {
  let service: FormMeetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormMeetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
