import { Subject } from "most-subject";
import { reduce } from "ramda";
import { createAction, Action } from "swifty";
import { Request, Success, Failure } from "../../types";

/**
 * Creates three async actions.
 *
 * @return Returns list with three actions.
 */

export default <R>(): {
  request$: Action<Request>;
  success$: Action<Success<R>>;
  failure$: Action<Failure>;
} => ({
  request$: createAction(),
  success$: createAction(),
  failure$: createAction()
});
