/**
 * Single route definition
 */

export interface OutletRoute {
  /* Unique route ID */
  key: string;
  path: string;
  children?: Array<OutletRoute>;
}

export interface PrimaryRoute extends OutletRoute {
  breadcrumb?: string;
  data?: {
    title: string;
    [field: string]: any;
  };
  children?: Array<PrimaryRoute>;
}

/**
 * Set of routes to define a complete module
 */
export type PrimaryRoutes = Array<PrimaryRoute>;
export type OutletRoutes = Array<OutletRoute>;
export type AppRoutes = Array<OutletRoute | PrimaryRoute>;
