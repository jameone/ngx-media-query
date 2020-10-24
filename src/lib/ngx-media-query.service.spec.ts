import { TestBed } from '@angular/core/testing';

import { NgxMediaQueryService } from './ngx-media-query.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialMediaQueriesState } from './store/media-queries.reducer';

describe('NgxMediaQueryService', () => {
  let service: NgxMediaQueryService;
  const initialState = initialMediaQueriesState;
  let mockStore: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({initialState})],
    }).compileComponents();
    mockStore = TestBed.inject(MockStore);
    service = TestBed.inject(NgxMediaQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
