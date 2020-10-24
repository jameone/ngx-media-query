import { MediaQueriesDirective } from './media-queries.directive';
import { async, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { initialMediaQueriesState } from './media-queries.reducer';
import { MediaQueriesActionsEnum } from './media-queries.actions';
import {
  screenWidthLg,
  screenWidthMd,
  screenWidthSm,
  screenWidthXl,
  screenWidthXs
} from './media-queries.models';

describe('MediaQueriesDirective (window.*EventListener is defined)', () => {
  const initialState = initialMediaQueriesState;
  let mockStore: MockStore;
  let directive: MediaQueriesDirective;

  beforeEach(async(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: query => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: () => {}, // deprecated
        removeListener: () => {}, // deprecated
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      }),
    });
    TestBed.configureTestingModule({
      providers: [provideMockStore({initialState})],
    }).compileComponents();
    mockStore = TestBed.inject(MockStore);
    directive = new MediaQueriesDirective(mockStore);

    Object.defineProperty(directive, 'screenQuery', {
      writable: true,
      value: {
        matches: true,
        onchange: null,
        addListener: () => {}, // deprecated
        removeListener: () => {}, // deprecated
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      },
    });

  }));

  it('should create an instance (window.*EventListener is defined)', () => {
    expect(directive).toBeTruthy();
  });

  // it('should dispatch an Update Media Query on init (window.*EventListener is defined)', async(() => {
  //   // prior to init, add event listeners should not have been called
  //   expect(directive.screenQuery.addEventListener).toHaveBeenCalledTimes(0);
  //   expect(directive.upperXsQuery.addEventListener).toHaveBeenCalledTimes(0);
  //   expect(directive.lowerSmQuery.addEventListener).toHaveBeenCalledTimes(0);
  //   expect(directive.upperSmQuery.addEventListener).toHaveBeenCalledTimes(0);
  //   expect(directive.lowerMdQuery.addEventListener).toHaveBeenCalledTimes(0);
  //   expect(directive.upperMdQuery.addEventListener).toHaveBeenCalledTimes(0);
  //   expect(directive.lowerLgQuery.addEventListener).toHaveBeenCalledTimes(0);
  //   expect(directive.upperLgQuery.addEventListener).toHaveBeenCalledTimes(0);
  //   expect(directive.lowerXlQuery.addEventListener).toHaveBeenCalledTimes(0);
  //   expect(directive.upperXlQuery.addEventListener).toHaveBeenCalledTimes(0);
  //   directive.ngOnInit();
  //   // post init, add event listeners should have been called exactly once
  //   expect(directive.screenQuery.addEventListener).toHaveBeenCalledTimes(1);
  //   expect(directive.upperXsQuery.addEventListener).toHaveBeenCalledTimes(1);
  //   expect(directive.lowerSmQuery.addEventListener).toHaveBeenCalledTimes(1);
  //   expect(directive.upperSmQuery.addEventListener).toHaveBeenCalledTimes(1);
  //   expect(directive.lowerMdQuery.addEventListener).toHaveBeenCalledTimes(1);
  //   expect(directive.upperMdQuery.addEventListener).toHaveBeenCalledTimes(1);
  //   expect(directive.lowerLgQuery.addEventListener).toHaveBeenCalledTimes(1);
  //   expect(directive.upperLgQuery.addEventListener).toHaveBeenCalledTimes(1);
  //   expect(directive.lowerXlQuery.addEventListener).toHaveBeenCalledTimes(1);
  //   expect(directive.upperXlQuery.addEventListener).toHaveBeenCalledTimes(1);
  //   // prior to destroy, add event listeners should not have been called
  //   expect(directive.screenQuery.removeEventListener).toHaveBeenCalledTimes(0);
  //   expect(directive.upperXsQuery.removeEventListener).toHaveBeenCalledTimes(0);
  //   expect(directive.lowerSmQuery.removeEventListener).toHaveBeenCalledTimes(0);
  //   expect(directive.upperSmQuery.removeEventListener).toHaveBeenCalledTimes(0);
  //   expect(directive.lowerMdQuery.removeEventListener).toHaveBeenCalledTimes(0);
  //   expect(directive.upperMdQuery.removeEventListener).toHaveBeenCalledTimes(0);
  //   expect(directive.lowerLgQuery.removeEventListener).toHaveBeenCalledTimes(0);
  //   expect(directive.upperLgQuery.removeEventListener).toHaveBeenCalledTimes(0);
  //   expect(directive.lowerXlQuery.removeEventListener).toHaveBeenCalledTimes(0);
  //   expect(directive.upperXlQuery.removeEventListener).toHaveBeenCalledTimes(0);
  //   directive.ngOnDestroy();
  //   // post destroy, remove event listeners should have been called exactly once
  //   expect(directive.screenQuery.removeEventListener).toHaveBeenCalledTimes(1);
  //   expect(directive.upperXsQuery.removeEventListener).toHaveBeenCalledTimes(1);
  //   expect(directive.lowerSmQuery.removeEventListener).toHaveBeenCalledTimes(1);
  //   expect(directive.upperSmQuery.removeEventListener).toHaveBeenCalledTimes(1);
  //   expect(directive.lowerMdQuery.removeEventListener).toHaveBeenCalledTimes(1);
  //   expect(directive.upperMdQuery.removeEventListener).toHaveBeenCalledTimes(1);
  //   expect(directive.lowerLgQuery.removeEventListener).toHaveBeenCalledTimes(1);
  //   expect(directive.upperLgQuery.removeEventListener).toHaveBeenCalledTimes(1);
  //   expect(directive.lowerXlQuery.removeEventListener).toHaveBeenCalledTimes(1);
  //   expect(directive.upperXlQuery.removeEventListener).toHaveBeenCalledTimes(1);
  // }));

  it('should detect width xs (window.*EventListener is defined)', async(() => {
    directive.ngOnInit();
    Object.defineProperty(directive, 'screenQuery', {
      writable: true,
      value: {
        matches: true,
        onchange: null,
        addListener: () => {}, // deprecated
        removeListener: () => {}, // deprecated
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      },
    });
    Object.defineProperty(directive, 'upperXsQuery', {
      writable: true,
      value: {
        matches: true,
        onchange: null,
        addListener: () => {}, // deprecated
        removeListener: () => {}, // deprecated
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      },
    });
    directive.screenXsConditional()();
    mockStore.scannedActions$.subscribe((action) => {
      expect(action.type).toEqual(MediaQueriesActionsEnum.SelectMediaQuery);
      expect(directive.currentMediaQuery).toEqual(screenWidthXs);
    });
  }));

  it('should detect width sm (window.*EventListener is defined)', async(() => {
    directive.ngOnInit();
    Object.defineProperty(directive, 'lowerSmQuery', {
      writable: true,
      value: {
        matches: true,
        onchange: null,
        addListener: () => {}, // deprecated
        removeListener: () => {}, // deprecated
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      },
    });
    Object.defineProperty(directive, 'upperSmQuery', {
      writable: true,
      value: {
        matches: true,
        onchange: null,
        addListener: () => {}, // deprecated
        removeListener: () => {}, // deprecated
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      },
    });
    directive.screenSmConditional()();
    mockStore.scannedActions$.subscribe((action) => {
      expect(action.type).toEqual(MediaQueriesActionsEnum.SelectMediaQuery);
      expect(directive.currentMediaQuery).toEqual(screenWidthSm);
    });
  }));

  it('should detect width md (window.*EventListener is defined)', async(() => {
    directive.ngOnInit();
    Object.defineProperty(directive, 'lowerMdQuery', {
      writable: true,
      value: {
        matches: true,
        onchange: null,
        addListener: () => {}, // deprecated
        removeListener: () => {}, // deprecated
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      },
    });
    Object.defineProperty(directive, 'upperMdQuery', {
      writable: true,
      value: {
        matches: true,
        onchange: null,
        addListener: () => {}, // deprecated
        removeListener: () => {}, // deprecated
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      },
    });
    directive.screenMdConditional()();
    mockStore.scannedActions$.subscribe((action) => {
      expect(action.type).toEqual(MediaQueriesActionsEnum.SelectMediaQuery);
      expect(directive.currentMediaQuery).toEqual(screenWidthMd);
    });
  }));

  it('should detect width lg (window.*EventListener is defined)', async(() => {
    directive.ngOnInit();
    Object.defineProperty(directive, 'lowerLgQuery', {
      writable: true,
      value: {
        matches: true,
        onchange: null,
        addListener: () => {}, // deprecated
        removeListener: () => {}, // deprecated
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      },
    });
    Object.defineProperty(directive, 'upperLgQuery', {
      writable: true,
      value: {
        matches: true,
        onchange: null,
        addListener: () => {}, // deprecated
        removeListener: () => {}, // deprecated
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      },
    });
    directive.screenLgConditional()();
    mockStore.scannedActions$.subscribe((action) => {
      expect(action.type).toEqual(MediaQueriesActionsEnum.SelectMediaQuery);
      expect(directive.currentMediaQuery).toEqual(screenWidthLg);
    });
  }));

  it('should detect width Xl (window.*EventListener is defined)', async(() => {
    directive.ngOnInit();
    Object.defineProperty(directive, 'lowerXlQuery', {
      writable: true,
      value: {
        matches: true,
        onchange: null,
        addListener: () => {}, // deprecated
        removeListener: () => {}, // deprecated
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      },
    });
    Object.defineProperty(directive, 'upperXlQuery', {
      writable: true,
      value: {
        matches: true,
        onchange: null,
        addListener: () => {}, // deprecated
        removeListener: () => {}, // deprecated
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      },
    });
    directive.screenXlConditional()();
    mockStore.scannedActions$.subscribe((action) => {
      expect(action.type).toEqual(MediaQueriesActionsEnum.SelectMediaQuery);
      expect(directive.currentMediaQuery).toEqual(screenWidthXl);
    });
  }));


  it('should detect width xs (window.*EventListener is defined)', async(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 599,
    });
    directive.ngOnInit();
    mockStore.scannedActions$.subscribe((action) => {
      expect(action.type).toEqual(MediaQueriesActionsEnum.SelectMediaQuery);
      expect(directive.currentMediaQuery).toEqual(screenWidthXs);
    });
  }));

  it('should detect width sm (window.*EventListener is defined)', async(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 959,
    });
    directive.ngOnInit();
    mockStore.scannedActions$.subscribe((action) => {
      expect(action.type).toEqual(MediaQueriesActionsEnum.SelectMediaQuery);
      expect(directive.currentMediaQuery).toEqual(screenWidthSm);
    });
  }));

  it('should detect width md (window.*EventListener is defined)', async(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1279,
    });
    directive.ngOnInit();
    mockStore.scannedActions$.subscribe((action) => {
      expect(action.type).toEqual(MediaQueriesActionsEnum.SelectMediaQuery);
      expect(directive.currentMediaQuery).toEqual(screenWidthMd);
    });
  }));

  it('should detect width lg (window.*EventListener is defined)', async(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1919,
    });
    directive.ngOnInit();
    mockStore.scannedActions$.subscribe((action) => {
      expect(action.type).toEqual(MediaQueriesActionsEnum.SelectMediaQuery);
      expect(directive.currentMediaQuery).toEqual(screenWidthLg);
    });
  }));

  it('should detect width Xl (window.*EventListener is defined)', async(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1920,
    });
    directive.ngOnInit();
    mockStore.scannedActions$.subscribe((action) => {
      expect(action.type).toEqual(MediaQueriesActionsEnum.SelectMediaQuery);
      expect(directive.currentMediaQuery).toEqual(screenWidthXl);
    });
  }));

});

describe('MediaQueriesDirective (window.*EventListener is undefined)', () => {
  const initialState = initialMediaQueriesState;
  let mockStore: MockStore;
  let directive: MediaQueriesDirective;


  beforeEach(async(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {}, // deprecated
        removeListener: () => {}, // deprecated
        addEventListener: undefined,
        removeEventListener: undefined,
        dispatchEvent: () => {},
      }),
    });

    TestBed.configureTestingModule({
      providers: [provideMockStore({initialState})],
    }).compileComponents();
    // media = TestBed.inject(MediaMatcher);
    mockStore = TestBed.inject(MockStore);
    directive = new MediaQueriesDirective(mockStore);

    Object.defineProperty(directive, 'screenQuery', {
      writable: true,
      value: {
        matches: true,
        onchange: null,
        addListener: () => {}, // deprecated
        removeListener: () => {}, // deprecated
        addEventListener: undefined,
        removeEventListener: undefined,
        dispatchEvent: () => {},
      },
    });
  }));

  // it('should dispatch an Update Media Query on init (window.*EventListener is undefined)', async(() => {
  //   // prior to init, add event listeners should not have been called
  //   expect(directive.screenQuery.addListener).toHaveBeenCalledTimes(0);
  //   expect(directive.upperXsQuery.addListener).toHaveBeenCalledTimes(0);
  //   expect(directive.lowerSmQuery.addListener).toHaveBeenCalledTimes(0);
  //   expect(directive.upperSmQuery.addListener).toHaveBeenCalledTimes(0);
  //   expect(directive.lowerMdQuery.addListener).toHaveBeenCalledTimes(0);
  //   expect(directive.upperMdQuery.addListener).toHaveBeenCalledTimes(0);
  //   expect(directive.lowerLgQuery.addListener).toHaveBeenCalledTimes(0);
  //   expect(directive.upperLgQuery.addListener).toHaveBeenCalledTimes(0);
  //   expect(directive.lowerXlQuery.addListener).toHaveBeenCalledTimes(0);
  //   expect(directive.upperXlQuery.addListener).toHaveBeenCalledTimes(0);
  //   directive.ngOnInit();
  //   // post init, add event listeners should have been called exactly once
  //   expect(directive.screenQuery.addListener).toHaveBeenCalledTimes(1);
  //   expect(directive.upperXsQuery.addListener).toHaveBeenCalledTimes(1);
  //   expect(directive.lowerSmQuery.addListener).toHaveBeenCalledTimes(1);
  //   expect(directive.upperSmQuery.addListener).toHaveBeenCalledTimes(1);
  //   expect(directive.lowerMdQuery.addListener).toHaveBeenCalledTimes(1);
  //   expect(directive.upperMdQuery.addListener).toHaveBeenCalledTimes(1);
  //   expect(directive.lowerLgQuery.addListener).toHaveBeenCalledTimes(1);
  //   expect(directive.upperLgQuery.addListener).toHaveBeenCalledTimes(1);
  //   expect(directive.lowerXlQuery.addListener).toHaveBeenCalledTimes(1);
  //   expect(directive.upperXlQuery.addListener).toHaveBeenCalledTimes(1);
  //   // prior to destroy, add event listeners should not have been called
  //   expect(directive.screenQuery.removeListener).toHaveBeenCalledTimes(0);
  //   expect(directive.upperXsQuery.removeListener).toHaveBeenCalledTimes(0);
  //   expect(directive.lowerSmQuery.removeListener).toHaveBeenCalledTimes(0);
  //   expect(directive.upperSmQuery.removeListener).toHaveBeenCalledTimes(0);
  //   expect(directive.lowerMdQuery.removeListener).toHaveBeenCalledTimes(0);
  //   expect(directive.upperMdQuery.removeListener).toHaveBeenCalledTimes(0);
  //   expect(directive.lowerLgQuery.removeListener).toHaveBeenCalledTimes(0);
  //   expect(directive.upperLgQuery.removeListener).toHaveBeenCalledTimes(0);
  //   expect(directive.lowerXlQuery.removeListener).toHaveBeenCalledTimes(0);
  //   expect(directive.upperXlQuery.removeListener).toHaveBeenCalledTimes(0);
  //   directive.ngOnDestroy();
  //   // post destroy, remove event listeners should have been called exactly once
  //   expect(directive.screenQuery.removeListener).toHaveBeenCalledTimes(1);
  //   expect(directive.upperXsQuery.removeListener).toHaveBeenCalledTimes(1);
  //   expect(directive.lowerSmQuery.removeListener).toHaveBeenCalledTimes(1);
  //   expect(directive.upperSmQuery.removeListener).toHaveBeenCalledTimes(1);
  //   expect(directive.lowerMdQuery.removeListener).toHaveBeenCalledTimes(1);
  //   expect(directive.upperMdQuery.removeListener).toHaveBeenCalledTimes(1);
  //   expect(directive.lowerLgQuery.removeListener).toHaveBeenCalledTimes(1);
  //   expect(directive.upperLgQuery.removeListener).toHaveBeenCalledTimes(1);
  //   expect(directive.lowerXlQuery.removeListener).toHaveBeenCalledTimes(1);
  //   expect(directive.upperXlQuery.removeListener).toHaveBeenCalledTimes(1);
  // }));

  it('should detect width xs (window.*EventListener is undefined)', async(() => {
    directive.ngOnInit();
    Object.defineProperty(directive, 'screenQuery', {
      writable: true,
      value: {
        matches: true,
        onchange: null,
        addListener: () => {}, // deprecated
        removeListener: () => {}, // deprecated
        addEventListener: undefined,
        removeEventListener: undefined,
        dispatchEvent: () => {},
      },
    });
    Object.defineProperty(directive, 'upperXsQuery', {
      writable: true,
      value: {
        matches: true,
        onchange: null,
        addListener: () => {}, // deprecated
        removeListener: () => {}, // deprecated
        addEventListener: undefined,
        removeEventListener: undefined,
        dispatchEvent: () => {},
      },
    });
    directive.screenXsConditional()();
    mockStore.scannedActions$.subscribe((action) => {
      expect(action.type).toEqual(MediaQueriesActionsEnum.SelectMediaQuery);
      expect(directive.currentMediaQuery).toEqual(screenWidthXs);
    });
  }));

  it('should detect width sm (window.*EventListener is undefined)', async(() => {
    directive.ngOnInit();
    Object.defineProperty(directive, 'lowerSmQuery', {
      writable: true,
      value: {
        matches: true,
        onchange: null,
        addListener: () => {}, // deprecated
        removeListener: () => {}, // deprecated
        addEventListener: undefined,
        removeEventListener: undefined,
        dispatchEvent: () => {},
      },
    });
    Object.defineProperty(directive, 'upperSmQuery', {
      writable: true,
      value: {
        matches: true,
        onchange: null,
        addListener: () => {}, // deprecated
        removeListener: () => {}, // deprecated
        addEventListener: undefined,
        removeEventListener: undefined,
        dispatchEvent: () => {},
      },
    });
    directive.screenSmConditional()();
    mockStore.scannedActions$.subscribe((action) => {
      expect(action.type).toEqual(MediaQueriesActionsEnum.SelectMediaQuery);
      expect(directive.currentMediaQuery).toEqual(screenWidthSm);
    });
  }));

  it('should detect width md (window.*EventListener is undefined)', async(() => {
    directive.ngOnInit();
    Object.defineProperty(directive, 'lowerMdQuery', {
      writable: true,
      value: {
        matches: true,
        onchange: null,
        addListener: () => {}, // deprecated
        removeListener: () => {}, // deprecated
        addEventListener: undefined,
        removeEventListener: undefined,
        dispatchEvent: () => {},
      },
    });
    Object.defineProperty(directive, 'upperMdQuery', {
      writable: true,
      value: {
        matches: true,
        onchange: null,
        addListener: () => {}, // deprecated
        removeListener: () => {}, // deprecated
        addEventListener: undefined,
        removeEventListener: undefined,
        dispatchEvent: () => {},
      },
    });
    directive.screenMdConditional()();
    mockStore.scannedActions$.subscribe((action) => {
      expect(action.type).toEqual(MediaQueriesActionsEnum.SelectMediaQuery);
      expect(directive.currentMediaQuery).toEqual(screenWidthMd);
    });
  }));

  it('should detect width lg (window.*EventListener is undefined)', async(() => {
    directive.ngOnInit();
    Object.defineProperty(directive, 'lowerLgQuery', {
      writable: true,
      value: {
        matches: true,
        onchange: null,
        addListener: () => {}, // deprecated
        removeListener: () => {}, // deprecated
        addEventListener: undefined,
        removeEventListener: undefined,
        dispatchEvent: () => {},
      },
    });
    Object.defineProperty(directive, 'upperLgQuery', {
      writable: true,
      value: {
        matches: true,
        onchange: null,
        addListener: () => {}, // deprecated
        removeListener: () => {}, // deprecated
        addEventListener: undefined,
        removeEventListener: undefined,
        dispatchEvent: () => {},
      },
    });
    directive.screenLgConditional()();
    mockStore.scannedActions$.subscribe((action) => {
      expect(action.type).toEqual(MediaQueriesActionsEnum.SelectMediaQuery);
      expect(directive.currentMediaQuery).toEqual(screenWidthLg);
    });
  }));

  it('should detect width Xl (window.*EventListener is undefined)', async(() => {
    directive.ngOnInit();
    Object.defineProperty(directive, 'lowerXlQuery', {
      writable: true,
      value: {
        matches: true,
        onchange: null,
        addListener: () => {}, // deprecated
        removeListener: () => {}, // deprecated
        addEventListener: undefined,
        removeEventListener: undefined,
        dispatchEvent: () => {},
      },
    });
    Object.defineProperty(directive, 'upperXlQuery', {
      writable: true,
      value: {
        matches: true,
        onchange: null,
        addListener: () => {}, // deprecated
        removeListener: () => {}, // deprecated
        addEventListener: undefined,
        removeEventListener: undefined,
        dispatchEvent: () => {},
      },
    });
    directive.screenXlConditional()();
    mockStore.scannedActions$.subscribe((action) => {
      expect(action.type).toEqual(MediaQueriesActionsEnum.SelectMediaQuery);
      expect(directive.currentMediaQuery).toEqual(screenWidthXl);
    });
  }));


  it('should detect width xs (window.*EventListener is undefined)', async(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 599,
    });
    directive.ngOnInit();
    mockStore.scannedActions$.subscribe((action) => {
      expect(action.type).toEqual(MediaQueriesActionsEnum.SelectMediaQuery);
      expect(directive.currentMediaQuery).toEqual(screenWidthXs);
    });
  }));

  it('should detect width sm (window.*EventListener is undefined)', async(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 959,
    });
    directive.ngOnInit();
    mockStore.scannedActions$.subscribe((action) => {
      expect(action.type).toEqual(MediaQueriesActionsEnum.SelectMediaQuery);
      expect(directive.currentMediaQuery).toEqual(screenWidthSm);
    });
  }));

  it('should detect width md (window.*EventListener is undefined)', async(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1279,
    });
    directive.ngOnInit();
    mockStore.scannedActions$.subscribe((action) => {
      expect(action.type).toEqual(MediaQueriesActionsEnum.SelectMediaQuery);
      expect(directive.currentMediaQuery).toEqual(screenWidthMd);
    });
  }));

  it('should detect width lg (window.*EventListener is undefined)', async(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1919,
    });
    directive.ngOnInit();
    mockStore.scannedActions$.subscribe((action) => {
      expect(action.type).toEqual(MediaQueriesActionsEnum.SelectMediaQuery);
      expect(directive.currentMediaQuery).toEqual(screenWidthLg);
    });
  }));

  it('should detect width Xl (window.*EventListener is undefined)', async(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1920,
    });
    directive.ngOnInit();
    mockStore.scannedActions$.subscribe((action) => {
      expect(action.type).toEqual(MediaQueriesActionsEnum.SelectMediaQuery);
      expect(directive.currentMediaQuery).toEqual(screenWidthXl);
    });
  }));

});
