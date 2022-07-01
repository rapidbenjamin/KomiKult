import { countComments,listCounter } from "../render";

test("countComments", () => {
  const comments = [
    {
      id: 1,
      creation_date: "2020-01-01",
      username: "test",
      comment: "test",
    },
    {
      id: 2,
      creation_date: "2020-01-01",
      username: "test",
      comment: "test",
    },
  ];
  expect(countComments(comments)).toBe(2);
}
);


test("item Count", () => {
  const likes = [
    {
      id : 1,
    },
    {
      id : 2,
    },
    {
      id : 3,
    },
  ];
  expect(listCounter(likes)).toBe(3);
}
);
