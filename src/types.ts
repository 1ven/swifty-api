import { Reducer, Action } from "swifty";

/**
 * Library settings config.
 */
export type Config = {
  root: string;
};

/**
 * Api instance object. Contains api entries inside. Could have deep structure.
 */
export type Api = {
  [key: string]: ApiEntry<any> | Api;
};

/**
 * ApiEntry instance object.
 */
export type ApiEntry<R> = {
  request$: Action<Request>;
  success$: Action<Success<R>>;
  failure$: Action<Failure>;
  reducer$: Reducer<State<R>>;
};

/**
 * Declarative spec of the whole api.
 */
export type Spec = {
  [key: string]: SpecEntry | Spec;
};

/**
 * Spec of api entry.
 */
export type SpecEntry = {
  url: string;
  method: string;
};
export const isSpecEntry = (a): a is SpecEntry => a.url && a.method;

/**
 * Api entry state.
 */
export type State<R> = {
  isFetching: boolean;
  error?: string;
  lastUpdated?: number;
  data?: R;
};

/**
 * Request action payload.
 */
export type Request = {
  params?: { [key: string]: string };
  body?: any;
};

/**
 * Success action payload.
 */
export type Success<R> = {
  receivedAt: number;
  data?: R;
};

/**
 * Failure action payload.
 */
export type Failure = {
  message?: string;
};
