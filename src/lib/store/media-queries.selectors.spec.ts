import { MediaQueriesEntity, nullMediaQuery } from './media-queries.models';
import {
  MediaQueriesState,
  mediaQueriesAdapter,
  initialMediaQueriesState,
} from './media-queries.reducer';
import * as MediaQueriesSelectors from './media-queries.selectors';

describe('MediaQueries Selectors', () => {
  const ERROR_MSG = new Error('No Error Available');
  const getMediaQueriesId = (it) => it.id;
  const createMediaQueriesEntity = (id: string, query = nullMediaQuery) =>
    ({
      id,
      query,
    } as MediaQueriesEntity);

  let state;

  beforeEach(() => {
    state = {
      mediaQueries: mediaQueriesAdapter.setAll(
        [
          createMediaQueriesEntity('Test-0'),
          createMediaQueriesEntity('Test-1'),
          createMediaQueriesEntity('Test-2'),
        ],
        {
          ...initialMediaQueriesState,
          selectedId: 'Test-1',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('MediaQueries Selectors', () => {
    it('getAllMediaQueries() should return the list of MediaQueries', () => {
      const results = MediaQueriesSelectors.getAllMediaQueries(state);
      const selId = getMediaQueriesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('Test-1');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = MediaQueriesSelectors.getSelectedMediaQuery(state);
      const selId = getMediaQueriesId(result);

      expect(selId).toBe('Test-1');
    });

    it(
      'getMediaQueriesLoaded() should return the current \'loaded\' status', () => {
        const result = MediaQueriesSelectors.getMediaQueriesLoaded(state);

        expect(result).toBe(true);
      });

    it('getMediaQueriesError() should return the current \'error\' state', () => {
      const result = MediaQueriesSelectors.getMediaQueriesError(state);

      expect(result).toBe(ERROR_MSG);
    });

    it('getMediaQueryIds() should have length 3', () => {
      const result = MediaQueriesSelectors.getMediaQueryIds(state);

      expect(result.length).toBe(3);
    });
  });
});
