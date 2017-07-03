import { Reducer, Action } from "swifty";
import { State } from "./modules/createEntry/createReducer";
import { Request, Success, Failure } from "./modules/createEntry/createActions";

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
  [key: string]: ApiEntry | Api;
};

/**
 * ApiEntry instance object.
 */
export type ApiEntry = {
  request$: Action<Request>;
  success$: Action<Success>;
  failure$: Action<Failure>;
  reducer$: Reducer<State>;
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
