import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMediaQueryComponent } from './ngx-media-query.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialMediaQueriesState } from './store/media-queries.reducer';

describe('NgxMediaQueryComponent', () => {
  let component: NgxMediaQueryComponent;
  let fixture: ComponentFixture<NgxMediaQueryComponent>;
  let mockStore: MockStore;
  const initialState = initialMediaQueriesState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({initialState})],
      declarations: [ NgxMediaQueryComponent ]
    })
    .compileComponents();
    mockStore = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMediaQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
