import { NgModule } from '@angular/core';
import { NgxMediaQueryComponent } from './ngx-media-query.component';
import { MediaQueriesDirective } from './store/media-queries.directive';
import { NG_MEDIA_QUERY_FEATURE_KEY, NG_MEDIA_QUERY_REDUCER } from './store/media-queries.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MediaQueriesEffects } from './store/media-queries.effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    NgxMediaQueryComponent,
    MediaQueriesDirective
  ],
  imports: [
    StoreModule.forFeature(NG_MEDIA_QUERY_FEATURE_KEY, NG_MEDIA_QUERY_REDUCER),
    EffectsModule.forFeature([MediaQueriesEffects])
  ],
  exports: [NgxMediaQueryComponent]
})
export class NgxMediaQueryModule { }
