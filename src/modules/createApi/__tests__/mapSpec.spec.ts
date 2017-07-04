import mapSpec from "../mapSpec";

test("applies given function to spec entry", () => {
  expect(
    mapSpec(() => "done", {
      todos: {
        url: "/todos",
        method: "GET"
      }
    })
  ).toEqual({
    todos: "done"
  });
});

test("applies recursively given function to spec entry", () => {
  expect(
    mapSpec(() => "done", {
      items: {
        todos: {
          url: "/todos",
          method: "GET"
        }
      }
    })
  ).toEqual({
    items: {
      todos: "done"
    }
  });
});
