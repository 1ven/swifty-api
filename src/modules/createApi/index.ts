import { compose, mapObjIndexed, ifElse, curry, prop } from "ramda";
import { combineReducers, Reducer } from "swifty";
import createEntry from "../createEntry";
import { Api, Spec, SpecEntry, isSpecEntry } from "../../types";

/**
 * Recursively maps given spec object.
 *
 * @param onSpecEntry Callback, which will be called on SpecEntry value.
 * @param spec Api spec object.
 * @return Returns new mapped spec.
 */
const mapSpec = curry((onSpecEntry: (a: Spec) => any, spec: Spec) =>
  mapObjIndexed(
    (_, key: string, spec: Spec) =>
      ifElse(isSpecEntry, onSpecEntry, () => mapSpec(onSpecEntry, spec[key])),
    spec
  )
);

/**
 * Creates Api object.
 *
 * @param spec Api spec object.
 * @return Returns new Api object.
 */
const createApi: CreateApi = mapSpec(createEntry);

/**
 * Creates root Api reducer with the same structure as given Api object.
 *
 * @param spec Api spec object.
 * @return Returns root Api reducer.
 */
export const toReducer: ToReducer = compose(
  combineReducers,
  mapSpec(prop("reducer$"))
);
export default createApi;

export type CreateApi = (a: Spec) => Api;
export type ToReducer = (a: Spec) => Reducer<{ [key: string]: Reducer<any> }>;
