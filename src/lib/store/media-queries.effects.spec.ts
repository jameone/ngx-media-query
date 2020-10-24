import { TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { hot } from 'jasmine-marbles';
import { provideMockActions } from '@ngrx/effects/testing';

import { MediaQueriesEffects } from './media-queries.effects';
import * as MediaQueriesActions from './media-queries.actions';

describe('MediaQueriesEffects', () => {
  let actions$: Observable<any>;
  let effects: MediaQueriesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MediaQueriesEffects,
        provideMockActions(() => actions$)
      ],
    });

    effects = TestBed.inject(MediaQueriesEffects);
  });

  describe('loadMediaQueries$', () => {
    it('should work', () => {
      actions$ = hot('-a-|', {a: MediaQueriesActions.loadMediaQueries()});

      const expected = hot('-a-|', {
        a: MediaQueriesActions.loadMediaQueriesSuccess({mediaQueries: []}),
      });

      expect(effects.loadMediaQueries$).toBeObservable(expected);
    });

    it('should throw error', () => {

      const loadError = new Error('error loading media queries');

      spyOn(effects, 'loadMediaQueries').and.throwError(loadError);

      actions$ = hot('-|', {a: MediaQueriesActions.loadMediaQueries()});

      const expected = hot('-|', {
        a: MediaQueriesActions.loadMediaQueriesFailure({error: loadError}),
      });

      expect(effects.loadMediaQueries$).toBeObservable(expected);
    });
  });
});
