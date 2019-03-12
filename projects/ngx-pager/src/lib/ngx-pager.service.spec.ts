import { TestBed } from '@angular/core/testing';

import { NgxPagerService } from './ngx-pager.service';

describe('NgxPagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxPagerService = TestBed.get(NgxPagerService);
    expect(service).toBeTruthy();
  });
});
