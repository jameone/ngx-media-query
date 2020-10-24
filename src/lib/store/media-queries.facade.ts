import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromMediaQueries from './media-queries.reducer';
import * as MediaQueriesSelectors from './media-queries.selectors';

@Injectable()
export class MediaQueriesFacade {
  loaded$ = this.store.pipe(
    select(MediaQueriesSelectors.getMediaQueriesLoaded)
  );
  allMediaQueries$ = this.store.pipe(
    select(MediaQueriesSelectors.getAllMediaQueries)
  );
  selectedMediaQueries$ = this.store.pipe(
    select(MediaQueriesSelectors.getSelectedMediaQuery)
  );

  constructor(
    private store: Store<fromMediaQueries.MediaQueriesPartialState>
  ) {}

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
