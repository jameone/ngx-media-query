import { MediaQueriesEntity, nullMediaQuery, screenWidthMd, screenWidthXl } from './media-queries.models';
import * as MediaQueriesActions from './media-queries.actions';
import { MediaQueriesState, initialMediaQueriesState, NG_MEDIA_QUERY_REDUCER } from './media-queries.reducer';
import { Action } from '@ngrx/store';
import { async } from '@angular/core/testing';

describe('MediaQueries Reducer', () => {
  // load initial queries
  let action: Action;
  let result: MediaQueriesState;

  const createMediaQueriesEntity = (id: string, query = nullMediaQuery) =>
    ({
      id,
      query,
    } as MediaQueriesEntity);

  beforeEach(async(() => {
    const mediaQueries = [
      createMediaQueriesEntity('Test-0'),
      createMediaQueriesEntity('Test-1'),
    ];
    // load initial queries
    action = MediaQueriesActions.loadMediaQueriesSuccess({
      mediaQueries,
    });
    result = NG_MEDIA_QUERY_REDUCER(initialMediaQueriesState, action);
  }));

  describe('valid MediaQueries actions', () => {
    it('loadMediaQueriesSuccess should return set the list of known MediaQueries', () => {
      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      action = {} as any;
      result = NG_MEDIA_QUERY_REDUCER(initialMediaQueriesState, action);

      expect(result).toBe(initialMediaQueriesState);
    });
  });

  describe('error loading media queries', () => {
    it('should return stat with error', () => {
      const loadError = new Error('error loading media queries');
      action = MediaQueriesActions.loadMediaQueriesFailure({
        error: loadError,
      });
      result = NG_MEDIA_QUERY_REDUCER(initialMediaQueriesState, action);

      expect(result.error).toBe(loadError);
    });
  });

  describe('selectMediaQuery()', () => {
    it('should select ids ', () => {
      action = MediaQueriesActions.selectMediaQuery({ id: 'Test-0' });
      result = NG_MEDIA_QUERY_REDUCER(result, action);

      expect(result.selectedId).toBe('Test-0');
    });

    it('should have undefined selected id', () => {
      action = MediaQueriesActions.selectMediaQuery({ id: 'Test-100' });
      result = NG_MEDIA_QUERY_REDUCER(result, action);

      expect(result.selectedId).toBeUndefined();
    });
  });

  describe('addMediaQuery()', () => {
    it('should add media query', () => {
      action = MediaQueriesActions.addMediaQuery({
        mediaQuery: {
          id: 'Test-2',
          query: nullMediaQuery
        }
      });
      result = NG_MEDIA_QUERY_REDUCER(result, action);
      expect(result.ids.length).toBe(3);
    });
  });

  describe('setMediaQuery()', () => {
    it('should set a single media query', () => {
      action = MediaQueriesActions.setMediaQuery({
        mediaQuery: {
          id: 'Test-2',
          query: screenWidthXl
        }
      });
      result = NG_MEDIA_QUERY_REDUCER(result, action);
      expect(result.ids.length).toBe(3);
      expect(result.entities['Test-2'].query).toBe(screenWidthXl);
    });
  });

  describe('upsertMediaQuery()', () => {
    it('should update a media query if it exists', () => {
      action = MediaQueriesActions.upsertMediaQuery({
        mediaQuery: {
          id: 'Test-1',
          query: screenWidthXl
        }
      });
      result = NG_MEDIA_QUERY_REDUCER(result, action);
      expect(result.ids.length).toBe(2);
      expect(result.entities['Test-1'].query).toBe(screenWidthXl);
    });

    it('should add media query if it does not exist', () => {
      action = MediaQueriesActions.upsertMediaQuery({
        mediaQuery: {
          id: 'Test-4',
          query: screenWidthMd
        }
      });
      result = NG_MEDIA_QUERY_REDUCER(result, action);
      expect(result.ids.length).toBe(3);
      expect(result.entities['Test-4'].query).toBe(screenWidthMd);
    });
  });

  describe('addMediaQueries()', () => {
    it('should add many media queries', () => {
      action = MediaQueriesActions.addMediaQueries({
        mediaQueries: [
          {
            id: 'Test-99',
            query: screenWidthXl
          },
          {
            id: 'Test-100',
            query: screenWidthMd
          }
        ]
      });
      result = NG_MEDIA_QUERY_REDUCER(result, action);
      expect(result.ids.length).toBe(4);
      expect(result.entities['Test-99'].query).toBe(screenWidthXl);
      expect(result.entities['Test-100'].query).toBe(screenWidthMd);
    });
  });

  describe('upsertMediaQueries()', () => {
    it('should upsert many media queries', () => {
      action = MediaQueriesActions.upsertMediaQueries({
        mediaQueries: [
          {
            id: 'Test-0',
            query: screenWidthXl
          },
          {
            id: 'Test-100',
            query: screenWidthMd
          }
        ]
      });
      result = NG_MEDIA_QUERY_REDUCER(result, action);
      expect(result.ids.length).toBe(3);
      expect(result.entities['Test-0'].query).toBe(screenWidthXl);
      expect(result.entities['Test-100'].query).toBe(screenWidthMd);
    });
  });

  describe('updateMediaQuery()', () => {
    it('should update a single media query if it exists', () => {
      action = MediaQueriesActions.updateMediaQuery({
        update: {
          id: 'Test-0',
          changes: {
            query: screenWidthXl
          }
        },
      });
      result = NG_MEDIA_QUERY_REDUCER(result, action);
      expect(result.ids.length).toBe(2);
      expect(result.entities['Test-0'].query).toBe(screenWidthXl);
    });

    it('should not update a single media if it does not exist', () => {
      action = MediaQueriesActions.updateMediaQuery({
        update: {
          id: 'Test-100',
          changes: {
            query: screenWidthXl
          }
        },
      });
      result = NG_MEDIA_QUERY_REDUCER(result, action);
      expect(result.ids.length).toBe(2);
      expect(result.entities[100]).toBeUndefined();
    });
  });

  describe('updateMediaQueries()', () => {
    it('should update many media queries', () => {
      action = MediaQueriesActions.updateMediaQueries({
        updates: [
          {
            id: 'Test-0',
            changes: {
              query: screenWidthXl
            }
          },
          {
            id: 'Test-100',
            changes: {
              query: screenWidthMd
            }
          },
        ]
      });
      result = NG_MEDIA_QUERY_REDUCER(result, action);
      expect(result.ids.length).toBe(2);
      expect(result.entities['Test-0'].query).toBe(screenWidthXl);
      expect(result.entities[100]).toBeUndefined();
    });
  });

  describe('mapMediaQueries()', () => {
    it('should map many media queries', () => {
      action = MediaQueriesActions.mapMediaQueries({
        entityMap: (entity) => ({ ...entity, id: 'Test-' + entity.id.toString() })
      });
      result = NG_MEDIA_QUERY_REDUCER(result, action);
      expect(result.ids.length).toBe(2);
      expect(result.entities['Test-0']).toBeUndefined();
      expect(result.entities['Test-1']).toBeUndefined();
      expect(result.entities['Test-Test-0'].query).toBe(nullMediaQuery);
      expect(result.entities['Test-Test-1'].query).toBe(nullMediaQuery);
    });
  });

  describe('deleteMediaQuery()', () => {
    it('should delete a media single media query', () => {
      action = MediaQueriesActions.deleteMediaQuery({
        id: 'Test-0',
      });
      result = NG_MEDIA_QUERY_REDUCER(result, action);
      expect(result.ids.length).toBe(1);
      expect(result.entities['Test-0']).toBeUndefined();
      expect(result.entities['Test-1'].query).toBe(nullMediaQuery);
    });

    it('should retain state if id does not exist', () => {
      const initialResult = result;
      action = MediaQueriesActions.deleteMediaQuery({
        id: 'Test-100',
      });
      result = NG_MEDIA_QUERY_REDUCER(result, action);
      expect(result.ids.length).toBe(2);
      expect(result).toBe(initialResult);
    });
  });

  describe('deleteMediaQueries()', () => {
    it('should delete many media queries', () => {
      action = MediaQueriesActions.deleteMediaQueries({
        ids: ['Test-0', 'Test-100'],
      });
      result = NG_MEDIA_QUERY_REDUCER(result, action);
      expect(result.ids.length).toBe(1);
      expect(result.entities['Test-0']).toBeUndefined();
      expect(result.entities['Test-1'].query).toBe(nullMediaQuery);
    });
  });

  describe('deleteMediaQueriesByPredicate()', () => {
    it('should delete many media queries by given predicate', () => {
      action = MediaQueriesActions.deleteMediaQueriesByPredicate({
        predicate: entity => entity.id === 'Test-0',
      });
      result = NG_MEDIA_QUERY_REDUCER(result, action);
      expect(result.ids.length).toBe(1);
      expect(result.entities['Test-0']).toBeUndefined();
      expect(result.entities['Test-1'].query).toBe(nullMediaQuery);
    });
  });

  describe('clearMediaQueries()', () => {
    it('should clear many media queries', () => {
      action = MediaQueriesActions.clearMediaQueries();
      result = NG_MEDIA_QUERY_REDUCER(result, action);
      expect(result.ids.length).toBe(0);
      expect(result.entities['Test-0']).toBeUndefined();
      expect(result.entities['Test-1']).toBeUndefined();
    });
  });

});
