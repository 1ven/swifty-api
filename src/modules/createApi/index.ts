import { compose, mapObjIndexed, ifElse, curry, prop } from "ramda";
import { combineReducers, Reducer } from "swifty";
import createEntry from "../createEntry";
import { Api, Spec, SpecEntry, isSpecEntry } from "../../types";

const mapSpec = curry((onSpecEntry: CreateApi, spec: Spec) =>
  mapObjIndexed(
    (_, key: string, spec: Spec) =>
      ifElse(isSpecEntry, onSpecEntry, () => mapSpec(onSpecEntry, spec[key])),
    spec
  )
);

const createApi: CreateApi = mapSpec(createEntry);

export const toReducer: ToReducer = compose(
  combineReducers,
  mapSpec(prop("reducer$"))
);
export default createApi;

export type CreateApi = (a: Spec) => Api;
export type ToReducer = (a: Spec) => Reducer<{ [key: string]: Reducer<any> }>;
