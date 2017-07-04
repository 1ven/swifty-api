import { compose, mapObjIndexed, ifElse, curry, prop } from "ramda";
import { combineReducers, Reducer } from "swifty";
import createEntry from "../createEntry";
import { Api, Spec, SpecEntry, isSpecEntry } from "../../types";
import mapSpec from "./mapSpec";

/**
 * Creates Api object.
 *
 * @param spec Api spec object.
 * @return Returns new Api object.
 */
const createApi = mapSpec(createEntry);

/**
 * Creates root Api reducer with the same structure as given Api object.
 *
 * @param spec Api spec object.
 * @return Returns root Api reducer.
 */
export const toReducer = compose(combineReducers, mapSpec(prop("reducer$")));
export default createApi;
