import { TestBed } from '@angular/core/testing';

import { ScheduleValidatorService } from './schedule-validator.service';

describe('ScheduleValidatorService', () => {
  let service: ScheduleValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
