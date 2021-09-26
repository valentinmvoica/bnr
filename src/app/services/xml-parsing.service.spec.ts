import { TestBed } from '@angular/core/testing';

import { XmlParsingService } from './xml-parsing.service';

describe('XmlParsingService', () => {
  let service: XmlParsingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmlParsingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
