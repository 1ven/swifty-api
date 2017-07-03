import { equals, when, head, last, tail, init } from "ramda";

const isSlash = equals("/");
const noTrailingSlash = when(isSlash(last), init);
const noLeadingSlash = when(isSlash(head), tail);

export default (a: string, b: string) =>
  `${noTrailingSlash(a)}/${noLeadingSlash(b)}`;
