import { keys } from "ramda";
import createApi from "../";

test("creates api object according given spec", () => {
  const api = createApi(
    {
      todos: {
        url: "/todos",
        method: "GET"
      }
    },
    {
      root: "https://site.com"
    }
  );

  expect(keys(api.todos)).toEqual(
    expect.arrayContaining(["request$", "success$", "failure$", "reducer$"])
  );
});
