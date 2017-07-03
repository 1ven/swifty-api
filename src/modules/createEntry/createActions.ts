import { Subject } from "most-subject";
import { times } from "ramda";
import { createAction, Action } from "swifty";

/**
 * Creates three async actions.
 *
 * @return Returns list with three actions.
 */
export default (): [Action<Request>, Action<Success>, Action<Failure>] =>
  times(() => createAction(), 3);

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
