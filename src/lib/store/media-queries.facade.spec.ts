import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';


// import { MediaQueriesEntity, nullMediaQuery } from './media-queries.models';
import { MediaQueriesEffects } from './media-queries.effects';
import { MediaQueriesFacade } from './media-queries.facade';

// import * as MediaQueriesActions from './media-queries.actions';
import {
  NG_MEDIA_QUERY_FEATURE_KEY,
  MediaQueriesState,
  NG_MEDIA_QUERY_REDUCER,
} from './media-queries.reducer';

interface TestSchema {
  mediaQueries: MediaQueriesState;
}

describe('MediaQueriesFacade', () => {
  let facade: MediaQueriesFacade;
  let store: Store<TestSchema>;
  // const createMediaQueriesEntity = (id: string, query = nullMediaQuery) =>
  //   ({
  //     id,
  //     query,
  //   } as MediaQueriesEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(NG_MEDIA_QUERY_FEATURE_KEY, NG_MEDIA_QUERY_REDUCER),
          EffectsModule.forFeature([MediaQueriesEffects]),
        ],
        providers: [MediaQueriesFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(MediaQueriesFacade);
    });

    // /**
    //  * The initially generated facade::loadAll() returns empty array
    //  */
    // it('loadAll() should return a list with a single element and with with loaded == true', async (done) => {
    //   try {
    //     let list = await readFirst(facade.allMediaQueries$);
    //     let isLoaded = await readFirst(facade.loaded$);
    //
    //     expect(list.length).toBe(0);
    //     expect(isLoaded).toBe(false);
    //
    //     facade.dispatch(MediaQueriesActions.loadMediaQueries());
    //
    //     list = await readFirst(facade.allMediaQueries$);
    //     isLoaded = await readFirst(facade.loaded$);
    //
    //     expect(list.length).toBe(0);
    //     expect(isLoaded).toBe(true);
    //
    //     done();
    //   } catch (err) {
    //     done.fail(err);
    //   }
    // });
    //
    // /**
    //  * Use `loadMediaQueriesSuccess` to manually update list
    //  */
    // it('allMediaQueries$ should return the loaded list; and loaded flag == true', async (done) => {
    //   try {
    //     let list = await readFirst(facade.allMediaQueries$);
    //     let isLoaded = await readFirst(facade.loaded$);
    //
    //     expect(list.length).toBe(0);
    //     expect(isLoaded).toBe(false);
    //
    //     facade.dispatch(
    //       MediaQueriesActions.loadMediaQueriesSuccess({
    //         mediaQueries: [
    //           createMediaQueriesEntity('Test-0'),
    //           createMediaQueriesEntity('Test-1'),
    //         ],
    //       })
    //     );
    //
    //     list = await readFirst(facade.allMediaQueries$);
    //     isLoaded = await readFirst(facade.loaded$);
    //
    //     expect(list.length).toBe(2);
    //     expect(isLoaded).toBe(true);
    //
    //     done();
    //   } catch (err) {
    //     done.fail(err);
    //   }
    // });
  });
});
