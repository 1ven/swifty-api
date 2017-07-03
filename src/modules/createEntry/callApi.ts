import { prop, applySpec } from "ramda";
import axios from "axios";

const now = () => Date.now();

/**
 * Performs ajax request.
 *
 * @param url Request url.
 * @param method Request method.
 * @param body Request body.
 * @return Returns api response object.
 */
export default (
  url: string,
  method: string,
  body: { [key: string]: any }
): Promise<{
  receivedAt: number;
  data: any;
}> =>
  axios({
    url,
    method,
    data: body
  })
    .then(
      applySpec({
        data: prop("data"),
        receivedAt: now
      })
    )
    .catch(prop("message")) as any;
