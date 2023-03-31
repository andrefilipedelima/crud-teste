/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AlertModalService } from './alert-modal.service';

describe('Service: AlertModal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertModalService]
    });
  });

  it('should ...', inject([AlertModalService], (service: AlertModalService) => {
    expect(service).toBeTruthy();
  }));
});
