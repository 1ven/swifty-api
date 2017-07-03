import { Reducer, Action } from "swifty";
import { State } from "./modules/createEntry/createReducer";
import { Request, Success, Failure } from "./modules/createEntry/createActions";

export type Config = {
  root: string;
};

export type Api = {
  [key: string]: ApiEntry | Api;
};

export type ApiEntry = {
  request$: Action<Request>;
  success$: Action<Success>;
  failure$: Action<Failure>;
  reducer$: Reducer<State>;
};

export type Spec = {
  [key: string]: SpecEntry | Spec;
};

export type SpecEntry = {
  url: string;
  method: string;
};
export const isSpecEntry = (a): a is SpecEntry => a.url && a.method;
