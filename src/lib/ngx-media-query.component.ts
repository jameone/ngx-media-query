import { Component, OnDestroy, OnInit } from '@angular/core';
import { clearMediaQueries, loadMediaQueries } from './store/media-queries.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lib-ngx-media-query',
  template: `
    <div libNgxMediaQuery></div>
  `,
  styles: [
  ]
})
export class NgxMediaQueryComponent implements OnInit, OnDestroy {

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadMediaQueries());
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearMediaQueries());
  }
}
