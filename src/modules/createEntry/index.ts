import { just, mergeArray } from "most";
import { curry } from "ramda";
import createActions from "./createActions";
import callApi from "./callApi";
import createReducer from "./createReducer";
import replaceParams from "./replaceParams";
import resolveUrl from "./resolveUrl";
import {
  Config,
  SpecEntry,
  ApiEntry,
  Request,
  Success,
  Failure
} from "../../types";

/**
 * Creates ApiEntry object.
 *
 * @param entry Api SpecEntry object.
 * @param config Library config.
 * @return Returns new ApiEntry object.
 */
export default curry(<R>(config: Config, entry: SpecEntry): ApiEntry<R> => {
  const { request$, success$, failure$ } = createActions<R>();

  request$.observe(({ body, params }: Request) => {
    const url = resolveUrl(config.root, entry.url);
    const withParams = replaceParams(url, params);

    callApi(withParams, entry.method, body)
      .then((s: Success<R>) => success$.next(s))
      .catch((f: Failure) => failure$.next(f));
  });

  const reducer$ = createReducer<R>(request$, success$, failure$);

  return {
    request$,
    success$,
    failure$,
    reducer$
  };
});
