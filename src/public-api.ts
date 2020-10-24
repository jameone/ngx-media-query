/*
 * Public API Surface of ngx-media-query
 */

export * from './lib/ngx-media-query.service';
export * from './lib/ngx-media-query.component';
export * from './lib/ngx-media-query.module';
export * from './lib/store/media-queries.models';
export {
  NG_MEDIA_QUERY_FEATURE_KEY,
  NG_MEDIA_QUERY_REDUCER
} from './lib/store/media-queries.reducer';
export { MediaQueriesEffects } from './lib/store/media-queries.effects';
