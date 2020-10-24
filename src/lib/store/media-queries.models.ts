/**
 * Interface for a single media query.
 */
export interface MediaQuery {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  lt_sm: boolean;
  lt_md: boolean;
  lt_lg: boolean;
  lt_xl: boolean;
  gt_xs: boolean;
  gt_sm: boolean;
  gt_md: boolean;
  gt_lg: boolean;
}

export const nullMediaQuery: MediaQuery = {
  xs: null,
  sm: null,
  md: null,
  lg: null,
  xl: null,
  lt_sm: null,
  lt_md: null,
  lt_lg: null,
  lt_xl: null,
  gt_xs: null,
  gt_sm: null,
  gt_md: null,
  gt_lg: null,
};

export const screenWidthXl: MediaQuery = {
  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl: true,
  lt_sm: false,
  lt_md: false,
  lt_lg: false,
  lt_xl: false,
  gt_xs: true,
  gt_sm: true,
  gt_md: true,
  gt_lg: true
};

export const screenWidthLg: MediaQuery = {
    xs: false,
    sm: false,
    md: false,
    lg: true,
    xl: false,
    lt_sm: false,
    lt_md: false,
    lt_lg: false,
    lt_xl: true,
    gt_xs: true,
    gt_sm: true,
    gt_md: true,
    gt_lg: false
};

export const screenWidthMd: MediaQuery = {
  xs: false,
  sm: false,
  md: true,
  lg: false,
  xl: false,
  lt_sm: false,
  lt_md: false,
  lt_lg: true,
  lt_xl: true,
  gt_xs: true,
  gt_sm: true,
  gt_md: false,
  gt_lg: false
};

export const screenWidthSm = {
  xs: false,
  sm: true,
  md: false,
  lg: false,
  xl: false,
  lt_sm: false,
  lt_md: true,
  lt_lg: true,
  lt_xl: true,
  gt_xs: true,
  gt_sm: false,
  gt_md: false,
  gt_lg: false
};

export const screenWidthXs = {
  xs: true,
  sm: false,
  md: false,
  lg: false,
  xl: false,
  lt_sm: true,
  lt_md: true,
  lt_lg: true,
  lt_xl: true,
  gt_xs: false,
  gt_sm: false,
  gt_md: false,
  gt_lg: false
};


/**
 * Interface for the 'MediaQueries' data
 */
export interface MediaQueriesEntity {
  id: string; // Primary ID
  query: MediaQuery;
}
