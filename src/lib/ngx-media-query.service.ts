import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MediaQueriesEntity } from './store/media-queries.models';
import { getSelectedMediaQuery } from './store/media-queries.selectors';
import { clearMediaQueries } from './store/media-queries.actions';

@Injectable({
  providedIn: 'root'
})
export class NgxMediaQueryService {

  constructor(private store: Store) {}

  getSelectedMediaQuery$(): Observable<MediaQueriesEntity> {
    return this.store.pipe(select(getSelectedMediaQuery));
  }

  clearMediaQueries(): void {
    this.store.dispatch(clearMediaQueries());
  }

}
