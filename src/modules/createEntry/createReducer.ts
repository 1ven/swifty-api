import { Action, Reducer } from "swifty";
import { Stream, mergeArray, just } from "most";
import { Subject } from "most-subject";
import { Request, Success, Failure } from "./createActions";

/**
 * Creates reducer for the api entry object.
 *
 * @param request$ Request action.
 * @param success$ Success action.
 * @param failure$ Failure action.
 * @return Returns api entry reducer.
 */
export default (
  request$: Action<Request>,
  success$: Action<Success>,
  failure$: Action<Failure>
): Reducer<State> =>
  mergeArray([
    request$.map((payload: Request) => (state: State) => ({
      ...state,
      isFetching: true
    })),
    success$.map((payload: Success) => (state: State) => ({
      ...state,
      isFetching: false,
      error: undefined,
      lastUpdated: payload.receivedAt,
      data: payload.data
    })),
    failure$.map((payload: Failure) => (state: State) => ({
      ...state,
      error: payload.message,
      isFetching: false,
      data: undefined
    })),
    just(() => ({
      isFetching: false
    }))
  ]);

export type State = {
  isFetching: boolean;
  error?: string;
  lastUpdated?: number;
  data?: any;
};
