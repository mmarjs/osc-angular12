/**
 * Types
 */

export interface Dictionary<T> {
  [field: string]: T;
}

export interface SwaggerEntity {
  type?: string;
  $ref?: string;
  schema?: {
    type?: string;
    $ref?: string;
  };
  // with
  items?: any;
  additionalProperties?: any;
}

export interface SwaggerFieldDef {
  type: string;
  comment?: string;
  enum?: Array<string>;
  required?: boolean;
  partial?: boolean;
}

export type DefinitionDef = Dictionary<SwaggerFieldDef>;

// parsed data

export type ParamType = 'path' | 'query' | 'body';

export interface RouteParam {
  in: ParamType;
  name: string;
  description: string;
  required: boolean;
  type?: string;
  // or
  schema?: {
    $ref: string;
  };
}

export interface RouteResponse {
  description: string;
  schema?: {
    $ref: string;
    // or
    type?: string; // with items or additionalProperties
    items?: {
      $ref: string;
    };
    additionalProperties?: {
      type: string;
    };
  };
}

export interface RouteDef {
  api: {
    method: string;
    url: string;
  };
  consumes?: string;
  produces?: string;
  parameters: Array<RouteParam>;
  responses: Dictionary<RouteResponse>;
}

export type RoutesDefs = Dictionary<RouteDef>;

// built definition

export interface MethodDef {
  docs: string;
  api: {
    method: string;
    url: string;
  };
  prefix: string;
  request: {
    exists: boolean;
    required?: boolean;
  };
  response?: string;
}

export interface ParamDef {
  name: string;
  type: string;
  in: ParamType;
  required: boolean;
}

export interface RequestDef {
  prefix: string;
  parameters: Array<ParamDef>;
}

export type ImportsDef = Dictionary<Array<string>>;

export interface ProviderDef {
  imports: ImportsDef;
  methods: Dictionary<MethodDef>;
  requests: Array<RequestDef>;
  responses?: Array<any>;
}

export interface EntityDef {
  imports: ImportsDef;
  fields: Dictionary<string>;
  required: Array<string>;
}
