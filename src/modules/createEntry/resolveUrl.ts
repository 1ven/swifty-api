import { equals, when, head, last, tail, init } from "ramda";

const isSlash = equals("/");
const noTrailingSlash = when(isSlash(last), init);
const noLeadingSlash = when(isSlash(head), tail);

/**
 * Connects two strings and puts `/` symbol between them.
 *
 * @param a Left string. Trailing slash will be cutted.
 * @param b Right string. Leading slash will be cutted.
 * @return Returns glued string.
 */
export default (a: string, b: string) =>
  `${noTrailingSlash(a)}/${noLeadingSlash(b)}`;
