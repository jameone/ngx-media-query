import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map } from 'rxjs/operators';

import * as MediaQueriesActions from './media-queries.actions';
import { MediaQueriesEntity } from './media-queries.models';
import { of } from 'rxjs';

@Injectable()
export class MediaQueriesEffects {
  loadMediaQueries$ = createEffect(() =>
      this.actions$.pipe(
        ofType(MediaQueriesActions.loadMediaQueries),
        map(() => {
          // Your custom service 'load' logic goes here.
          const mediaQueries = this.loadMediaQueries();
          return MediaQueriesActions.loadMediaQueriesSuccess({mediaQueries});
        }),
        catchError((error) => {
          console.error('Error', error);
          return of(MediaQueriesActions.loadMediaQueriesFailure({error}));
        })
      ),
    {dispatch: true, resubscribeOnError: false}
  );

  constructor(private actions$: Actions) {
  }

  loadMediaQueries(): MediaQueriesEntity[] {
    return [];
  }
}
