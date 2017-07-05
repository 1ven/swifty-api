import { Action, Reducer } from "swifty";
import { Stream, mergeArray, just } from "most";
import { Subject } from "most-subject";
import { State, Request, Success, Failure } from "../../types";

/**
 * Creates reducer for the api entry object.
 *
 * @param request$ Request action.
 * @param success$ Success action.
 * @param failure$ Failure action.
 * @return Returns api entry reducer.
 */
export default <R>(
  request$: Action<Request>,
  success$: Action<Success<R>>,
  failure$: Action<Failure>
): Reducer<State<R>> =>
  mergeArray([
    request$.map((payload: Request) => (state: State<R>) => ({
      ...state,
      isFetching: true
    })),
    success$.map((payload: Success<R>) => (state: State<R>) => ({
      ...state,
      isFetching: false,
      error: undefined,
      lastUpdated: payload.receivedAt,
      data: payload.data
    })),
    failure$.map((payload: Failure) => (state: State<R>) => ({
      ...state,
      error: payload.message,
      isFetching: false,
      data: undefined
    })),
    just(() => ({
      isFetching: false
    }))
  ]);
