import { TestBed } from '@angular/core/testing';

import { Dashbaord } from './dashbaord';

describe('Dashbaord', () => {
  let service: Dashbaord;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dashbaord);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
