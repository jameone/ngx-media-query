import { Directive, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addMediaQuery, selectMediaQuery,
  // updateMediaQuery
} from './media-queries.actions';
import {
  MediaQuery,
  // nullMediaQuery,
  screenWidthLg,
  screenWidthMd,
  screenWidthSm,
  screenWidthXl,
  screenWidthXs
} from './media-queries.models';

@Directive({
  selector: '[libNgxMediaQuery]'
})
export class MediaQueriesDirective implements OnInit, OnDestroy {

  // mediaQuery
  currentMediaQuery: MediaQuery;

  // screen
  screenQuery: MediaQueryList;
  private readonly screenQueryListener: () => void;
  // xs
  upperXsQuery: MediaQueryList;
  private readonly xsQueryListener: () => void;
  // sm
  lowerSmQuery: MediaQueryList;
  upperSmQuery: MediaQueryList;
  private readonly smQueryListener: () => void;
  // md
  lowerMdQuery: MediaQueryList;
  upperMdQuery: MediaQueryList;
  private readonly mdQueryListener: () => void;
  // lg
  lowerLgQuery: MediaQueryList;
  upperLgQuery: MediaQueryList;
  private readonly lgQueryListener: () => void;
  // xl
  lowerXlQuery: MediaQueryList;
  upperXlQuery: MediaQueryList;
  private readonly xlQueryListener: () => void;

  constructor(
    private store: Store,
  ) {
    // screen
    this.screenQuery = window.matchMedia('screen');
    this.screenQueryListener = () => {};
    // xs
    this.upperXsQuery = window.matchMedia('(max-width: 599px)');
    this.xsQueryListener = this.screenXsConditional();
    // sm
    this.lowerSmQuery = window.matchMedia('(min-width: 600px)');
    this.upperSmQuery = window.matchMedia('(max-width: 959px)');
    this.smQueryListener = this.screenSmConditional();
    // md
    this.lowerMdQuery = window.matchMedia('(min-width: 960px)');
    this.upperMdQuery = window.matchMedia('(max-width: 1279px)');
    this.mdQueryListener = this.screenMdConditional();
    // lg
    this.lowerLgQuery = window.matchMedia('(min-width: 1280px)');
    this.upperLgQuery = window.matchMedia('(max-width: 1919px)');
    this.lgQueryListener = this.screenLgConditional();
    // xl
    this.lowerXlQuery = window.matchMedia('(min-width: 1920px)');
    this.upperXlQuery = window.matchMedia('(max-width: 5000px)');
    this.xlQueryListener = this.screenXlConditional();
  }


  ngOnInit(): void {
    if (typeof window.matchMedia('(min-width: 0px)').addEventListener !== 'undefined') {
      // screen
      this.screenQuery.addEventListener('change', this.screenQueryListener);
      // xs
      this.upperXsQuery.addEventListener('change', this.xsQueryListener);
      // sm
      this.lowerSmQuery.addEventListener('change', this.smQueryListener);
      this.upperSmQuery.addEventListener('change', this.smQueryListener);
      // md
      this.lowerMdQuery.addEventListener('change', this.mdQueryListener);
      this.upperMdQuery.addEventListener('change', this.mdQueryListener);
      // lg
      this.lowerLgQuery.addEventListener('change', this.lgQueryListener);
      this.upperLgQuery.addEventListener('change', this.lgQueryListener);
      // xl
      this.lowerXlQuery.addEventListener('change', this.xlQueryListener);
      this.upperXlQuery.addEventListener('change', this.xlQueryListener);
    } else {
      // As of July 4, 2020 it is expect Safari does not implement
      // MediaQueryList.addEventListener and so MediaQueryList.addListener
      // is used if the MediaQueryList.addEventListener is not found. See:
      // https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList.

      // screen
      this.screenQuery.addListener(this.screenQueryListener);
      // xs
      this.upperXsQuery.addListener(this.xsQueryListener);
      // sm
      this.lowerSmQuery.addListener(this.smQueryListener);
      this.upperSmQuery.addListener(this.smQueryListener);
      // md
      this.lowerMdQuery.addListener(this.mdQueryListener);
      this.upperMdQuery.addListener(this.mdQueryListener);
      // lg
      this.lowerLgQuery.addListener(this.lgQueryListener);
      this.upperLgQuery.addListener(this.lgQueryListener);
      // xl
      this.lowerXlQuery.addListener(this.xlQueryListener);
      this.upperXlQuery.addListener(this.xlQueryListener);
    }
    // initialize states
    this.initializeState();
  }

  ngOnDestroy(): void {
    if (typeof window.matchMedia('(min-width: 0px)').removeEventListener !== 'undefined') {
      // screen
      this.screenQuery.removeEventListener('change', this.screenQueryListener);
      // xs
      this.upperXsQuery.removeEventListener('change', this.xsQueryListener);
      // sm
      this.lowerSmQuery.removeEventListener('change', this.smQueryListener);
      this.upperSmQuery.removeEventListener('change', this.smQueryListener);
      // md
      this.lowerMdQuery.removeEventListener('change', this.mdQueryListener);
      this.upperMdQuery.removeEventListener('change', this.mdQueryListener);
      // lg
      this.lowerLgQuery.removeEventListener('change', this.lgQueryListener);
      this.upperLgQuery.removeEventListener('change', this.lgQueryListener);
      // xl
      this.lowerXlQuery.removeEventListener('change', this.xlQueryListener);
      this.upperXlQuery.removeEventListener('change', this.xlQueryListener);
    } else {
      // As of July 4, 2020 it is expect Safari does not implement
      // MediaQueryList.removeEventListener and so MediaQueryList.removeListener
      // is used if the MediaQueryList.removeEventListener is not found. See:
      // https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList
      // screen
      this.screenQuery.removeListener(this.screenQueryListener);
      // xs
      this.upperXsQuery.removeListener(this.xsQueryListener);
      // sm
      this.lowerSmQuery.removeListener(this.smQueryListener);
      this.upperSmQuery.removeListener(this.smQueryListener);
      // md
      this.lowerMdQuery.removeListener(this.mdQueryListener);
      this.upperMdQuery.removeListener(this.mdQueryListener);
      // lg
      this.lowerLgQuery.removeListener(this.lgQueryListener);
      this.upperLgQuery.removeListener(this.lgQueryListener);
      // xl
      this.lowerXlQuery.removeListener(this.xlQueryListener);
      this.upperXlQuery.removeListener(this.xlQueryListener);
    }
  }

  private dispatchMediaQuery(): void {
    const id = new Date().getTime().toString();
    this.store.dispatch(addMediaQuery({
      mediaQuery: {
        id,
        query: this.currentMediaQuery,
      }
    }));
    this.store.dispatch(selectMediaQuery({ id }));
  }

  // Class methods.

  // xs
  screenXsConditional(): () => void {
    return () => {
      if (this.screenQuery.matches
        && this.upperXsQuery.matches) {
        this.notifyStoreScreenWidthXs();
      }
    };
  }

  private notifyStoreScreenWidthXs(): void {
    this.currentMediaQuery = screenWidthXs;
    this.dispatchMediaQuery();
  }

  // sm
  screenSmConditional(): () => void {
    return () => {
      if (this.screenQuery.matches
        && this.lowerSmQuery.matches
        && this.upperSmQuery.matches) {
        this.notifyStoreScreenWidthSm();
      }
    };
  }

  private notifyStoreScreenWidthSm(): void {
    this.currentMediaQuery = screenWidthSm;
    this.dispatchMediaQuery();
  }

  // md
  screenMdConditional(): () => void {
    return () => {
      if (this.screenQuery.matches
        && this.lowerMdQuery.matches
        && this.upperMdQuery.matches) {
        this.notifyStoreScreenWidthMd();
      }
    };
  }

  private notifyStoreScreenWidthMd(): void {
    this.currentMediaQuery = screenWidthMd;
    this.dispatchMediaQuery();
  }

  // lg
  screenLgConditional(): () => void {
    return () => {
      if (this.screenQuery.matches
        && this.lowerLgQuery.matches
        && this.upperLgQuery.matches) {
        this.notifyStoreScreenWidthLg();
      }
    };
  }

  private notifyStoreScreenWidthLg(): void {
    this.currentMediaQuery = screenWidthLg;
    this.dispatchMediaQuery();
  }

  // xl
  screenXlConditional(): () => void {
    return () => {
      if (this.screenQuery.matches
        && this.lowerXlQuery.matches
        && this.upperXlQuery.matches) {
        this.notifyStoreScreenWidthXl();
      }
    };
  }

  private notifyStoreScreenWidthXl(): void {
    this.currentMediaQuery = screenWidthXl;
    this.dispatchMediaQuery();
  }

  private initializeState(): void {
    // Initialize the store with a MediaQueryStateInterface
    // reflecting the size of current user's screen.
    // Since the media events will not have fired on initialization,
    // we set the starting state using the window object.
    if (window.screen && window.innerWidth < 600) {
      this.notifyStoreScreenWidthXs();
    } else if (window.screen && window.innerWidth < 960 && window.innerWidth >= 600) {
      this.notifyStoreScreenWidthSm();
    } else if (window.screen && window.innerWidth < 1280 && window.innerWidth >= 960) {
      this.notifyStoreScreenWidthMd();
    } else if (window.screen && window.innerWidth < 1920 && window.innerWidth >= 960) {
      this.notifyStoreScreenWidthLg();
    } else if (window.screen) {
      this.notifyStoreScreenWidthXl();
    }
  }
}
