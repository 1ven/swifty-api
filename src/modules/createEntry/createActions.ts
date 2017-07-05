import { Subject } from "most-subject";
import { reduce } from "ramda";
import { createAction, Action } from "swifty";

/**
 * Creates three async actions.
 *
 * @return Returns list with three actions.
 */

export default (): {
  request$: Action<Request>;
  success$: Action<Success>;
  failure$: Action<Failure>;
} => ({
  request$: createAction(),
  success$: createAction(),
  failure$: createAction()
});

export type Request = {
  params?: { [key: string]: string };
  body?: any;
};

export type Success = {
  receivedAt: number;
  data?: any;
};

export type Failure = {
  message?: string;
};
