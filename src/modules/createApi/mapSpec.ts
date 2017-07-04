import { mapObjIndexed, ifElse, curry } from "ramda";
import { Spec, isSpecEntry } from "../../types";

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
      ifElse(isSpecEntry, onSpecEntry, () => mapSpec(onSpecEntry, spec[key]))(
        spec[key]
      ),
    spec
  )
);

export default mapSpec;
