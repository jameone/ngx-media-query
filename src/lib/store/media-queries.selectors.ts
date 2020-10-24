import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  NG_MEDIA_QUERY_FEATURE_KEY,
  MediaQueriesState,
  MediaQueriesPartialState,
  mediaQueriesAdapter,
} from './media-queries.reducer';

// Lookup the 'MediaQueries' feature state managed by NgRx
export const getMediaQueriesState = createFeatureSelector<
  MediaQueriesPartialState,
  MediaQueriesState
>(NG_MEDIA_QUERY_FEATURE_KEY);

const { selectAll, selectEntities } = mediaQueriesAdapter.getSelectors();

export const getMediaQueriesLoaded = createSelector(
  getMediaQueriesState,
  (state: MediaQueriesState) => state.loaded
);

export const getMediaQueriesError = createSelector(
  getMediaQueriesState,
  (state: MediaQueriesState) => state.error
);

export const getAllMediaQueries = createSelector(
  getMediaQueriesState,
  (state: MediaQueriesState) => selectAll(state)
);

export const getMediaQueriesEntities = createSelector(
  getMediaQueriesState,
  (state: MediaQueriesState) => selectEntities(state)
);

export const getSelectedMediaQueryId = createSelector(
  getMediaQueriesState,
  (state: MediaQueriesState) => state.selectedId
);

export const getMediaQueryIds = createSelector(
  getMediaQueriesState,
  (state: MediaQueriesState) => state.ids
);

export const getSelectedMediaQuery = createSelector(
  getMediaQueriesEntities,
  getSelectedMediaQueryId,
  (entities, selectedId) => entities[selectedId]
);
