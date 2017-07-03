import { just, mergeArray } from "most";
import createActions, { Request, Success, Failure } from "./createActions";
import callApi from "./callApi";
import createReducer from "./createReducer";
import replaceParams from "./replaceParams";
import resolveUrl from "./resolveUrl";
import { Config, SpecEntry, ApiEntry } from "../../types";

/**
 * Creates ApiEntry object.
 *
 * @param entry Api SpecEntry object.
 * @param config Library config.
 * @return Returns new ApiEntry object.
 */
export default (entry: SpecEntry, config: Config): ApiEntry => {
  const [request$, success$, failure$] = createActions();

  request$.observe(({ body, params }: Request) => {
    const url = resolveUrl(config.root, entry.url);
    const withParams = replaceParams(url, params);

    callApi(withParams, entry.method, body)
      .then((s: Success) => success$.next(s))
      .catch((f: Failure) => failure$.next(f));
  });

  const reducer$ = createReducer(request$, success$, failure$);

  return {
    request$,
    success$,
    failure$,
    reducer$
  };
};
