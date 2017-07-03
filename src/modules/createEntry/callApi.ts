import { prop, applySpec } from "ramda";
import axios from "axios";

const now = () => Date.now();

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
