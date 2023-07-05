const posts = [
  {
    id: "1",
    title: "optio molestias id quia eum",
    content: 23,
    user_id: "2",
  },
  {
    id: "2",
    title: "dolor sint quo a velit explicabo quia nam",
    content: 32,
    user_id: "1",
  },
  {
    id: "3",
    title: "maxime id vitae nihil numquam",
    content: 69,
    user_id: "2",
  },
];

const users = [
  {
    id: "1",
    name: "John Doe",
  },
  {
    id: "2",
    name: "Bill Gates",
  },
];

const comments = [
  {
    id: "1",
    text: "They lost the contest for committing an error.",
    user_id: "1",
    post_id: "2",
  },
  {
    id: "2",
    text: "Three can keep a secret, if two of them are dead.",
    user_id: "2",
    post_id: "1",
  },
];

const resolvers = {
  Query: {
    posts: () => posts,
    users: () => users,
    comments: () => comments,
  },
  Post: {
    user: (parent) => {
      return users.find((user) => user.id === parent.user_id);
    },
    comments: (parent) => {
      return comments.filter((comment) => comment.post_id === parent.id);
    },
  },
  User: {
    posts: (parent) => {
      return posts.filter((post) => post.user_id === parent.id);
    },
  },
  Comment: {
    user: (parent) => {
      return users.find((user) => user.id === parent.user_id);
    },
    post: (parent) => {
      return posts.find((post) => post.id === parent.post_id);
    },
  },
};

export default resolvers;
