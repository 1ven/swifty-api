import { just, mergeArray } from "most";
import createActions, { Request, Success, Failure } from "./createActions";
import callApi from "./callApi";
import createReducer from "./createReducer";
import replaceParams from "./replaceParams";
import resolveUrl from "./resolveUrl";
import { Config, SpecEntry, ApiEntry } from "../../types";

export default (entry: SpecEntry, config: Config): ApiEntry => {
  const [request$, success$, failure$] = createActions();

  request$.observe(({ body, params }: Request) => {
    const url = resolveUrl(config.root, entry.url);
    const withParams = replaceParams(url, params);

    callApi(withParams, entry.method, body)
      .then((res: Success) => success$.next(res))
      .catch((failure: Failure) => failure$.next(failure));
  });

  const reducer$ = createReducer(request$, success$, failure$);

  return {
    request$,
    success$,
    failure$,
    reducer$
  };
};
