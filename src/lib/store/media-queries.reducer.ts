import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as MediaQueriesActions from './media-queries.actions';
import { MediaQueriesEntity } from './media-queries.models';

export const NG_MEDIA_QUERY_FEATURE_KEY = 'mediaQueries';

export interface MediaQueriesState extends EntityState<MediaQueriesEntity> {
  selectedId?: string; // which MediaQueries record has been selected
  loaded: boolean; // has the MediaQueries list been loaded
  error?: Error; // last known error (if any)
}

export interface MediaQueriesPartialState {
  readonly [NG_MEDIA_QUERY_FEATURE_KEY]: MediaQueriesState;
}

export const mediaQueriesAdapter: EntityAdapter<MediaQueriesEntity> = createEntityAdapter<
  MediaQueriesEntity
>();

export const initialMediaQueriesState: MediaQueriesState = mediaQueriesAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const mediaQueriesReducer = createReducer(
  initialMediaQueriesState,
  on(MediaQueriesActions.loadMediaQueries, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(MediaQueriesActions.loadMediaQueriesSuccess, (state, { mediaQueries }) => {
    return mediaQueriesAdapter.setAll(mediaQueries, { ...state, loaded: true });
  }),
  on(MediaQueriesActions.loadMediaQueriesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(MediaQueriesActions.selectMediaQuery, (state, {id}) => ({
    ...state,
    selectedId: state.entities[id] !== undefined ? id : undefined
  })),
  on(MediaQueriesActions.addMediaQuery, (state, { mediaQuery }) => {
    return mediaQueriesAdapter.addOne(mediaQuery, state);
  }),
  on(MediaQueriesActions.setMediaQuery, (state, { mediaQuery }) => {
    return mediaQueriesAdapter.setOne(mediaQuery, state);
  }),
  on(MediaQueriesActions.upsertMediaQuery, (state, { mediaQuery }) => {
    return mediaQueriesAdapter.upsertOne(mediaQuery, state);
  }),
  on(MediaQueriesActions.addMediaQueries, (state, { mediaQueries }) => {
    return mediaQueriesAdapter.addMany(mediaQueries, state);
  }),
  on(MediaQueriesActions.upsertMediaQueries, (state, { mediaQueries }) => {
    return mediaQueriesAdapter.upsertMany(mediaQueries, state);
  }),
  on(MediaQueriesActions.updateMediaQuery, (state, { update }) => {
    return mediaQueriesAdapter.updateOne(update, state);
  }),
  on(MediaQueriesActions.updateMediaQueries, (state, { updates }) => {
    return mediaQueriesAdapter.updateMany(updates, state);
  }),
  on(MediaQueriesActions.mapMediaQueries, (state, { entityMap }) => {
    return mediaQueriesAdapter.map(entityMap, state);
  }),
  on(MediaQueriesActions.deleteMediaQuery, (state, { id }) => {
    return mediaQueriesAdapter.removeOne(id, state);
  }),
  on(MediaQueriesActions.deleteMediaQueries, (state, { ids }) => {
    return mediaQueriesAdapter.removeMany(ids, state);
  }),
  on(MediaQueriesActions.deleteMediaQueriesByPredicate, (state, { predicate }) => {
    return mediaQueriesAdapter.removeMany(predicate, state);
  }),
  on(MediaQueriesActions.clearMediaQueries, state => {
    return mediaQueriesAdapter.removeAll({ ...state, selectedId: null });
  })
);

export function NG_MEDIA_QUERY_REDUCER(state: MediaQueriesState | undefined, action: Action): MediaQueriesState {
  return mediaQueriesReducer(state, action);
}
