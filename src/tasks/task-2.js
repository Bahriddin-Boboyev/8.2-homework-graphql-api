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
    post: (parent, args, contextValue, info) => {
      const post = posts.find((p) => p.id == args.id);
      if (!post) {
        throw new Error("Post not found!");
      }
      return post;
    },

    users: () => users,
    user: (parent, args, contextValue, info) => {
      const user = users.find((u) => u.id == args.id);
      if (!user) {
        throw new Error("User not found!");
      }
      return user;
    },

    comments: () => comments,
    comment: (parent, args, contextValue, info) => {
      const comment = users.find((c) => c.id == args.id);
      if (!comment) {
        throw new Error("Comment not found!");
      }
      return comment;
    },
  },
  Post: {
    user: (parent) => {
      return users.find((user) => user.id == parent.user_id);
    },
    comments: (parent) => {
      return comments.filter((comment) => comment.post_id == parent.id);
    },
  },
  User: {
    posts: (parent) => {
      return posts.filter((post) => post.user_id == parent.id);
    },
  },
  Comment: {
    user: (parent) => {
      return users.find((user) => user.id == parent.user_id);
    },
    post: (parent) => {
      return posts.find((post) => post.id == parent.post_id);
    },
  },

  Mutation: {
    createPost: (parent, args, contextValue, info) => {
      const user = users.find((u) => u.id == args.input.user_id);
      const index = users.indexOf(user);
      if (!user) {
        throw new Error("User not found!");
      }

      posts.push({
        id: posts.length + 1,
        title: args.input.title,
        content: args.input.content,
        user_id: args.input.user_id,
      });
      return posts.at(-1);
    },
    updatePost: (parent, args, contextValue, info) => {
      const post = posts.find((p) => p.id == args.id);
      const index = posts.indexOf(post);
      if (!post) {
        throw new Error("Post not found!");
      }
      const update = { ...post, ...args.input };
      posts.splice(index, 1, update);
      return posts[index];
    },

    removePost: (parent, args, contextValue, info) => {
      const post = posts.find((p) => p.id == args.id);
      const index = posts.indexOf(post);

      if (!post) {
        throw new Error("Post not found!");
      }

      posts.splice(index, 1);
      return post;
    },

    ////////////////////////////////////

    createUser: (parent, args, contextValue, info) => {
      users.push({
        id: users.length + 1,
        name: args.input.name,
      });
      return users.at(-1);
    },
    updateUser: (parent, args, contextValue, info) => {
      const user = users.find((u) => u.id == args.id);
      const index = users.indexOf(user);

      if (!user) {
        throw new Error("User not found!");
      }
      const update = { ...user, ...args.input };
      users.splice(index, 1, update);
      return users[index];
    },
    removeUser: (parent, args, contextValue, info) => {
      const user = users.find((u) => u.id == args.id);
      const index = users.indexOf(user);

      if (!user) {
        throw new Error("User not found!");
      }

      users.splice(index, 1);
      return user;
    },

    ////////////////////////////////////

    createComment: (parent, args, contextValue, info) => {
      const user = users.find((u) => u.id == args.input.user_id);
      const post = posts.find((p) => p.id == args.input.post_id);

      if (!user) {
        throw new Error("User not found!");
      }
      if (!post) {
        throw new Error("Post not found!");
      }
      comments.push({
        id: comments.length + 1,
        text: args.input.text,
        user_id: args.input.user_id,
        post_id: args.input.post_id,
      });
      return comments.at(-1);
    },

    updateComment: (parent, args, contextValue, info) => {
      const comment = comments.find((c) => c.id == args.id);
      const index = comments.indexOf(comment);

      if (!comment) {
        throw new Error("Comment not found!");
      }

      if (args.input.user_id) {
        const user = users.find((u) => u.id == args.input.user_id);

        if (!user) {
          throw new Error("User not found!");
        }
      }

      if (args.input.post_id) {
        const post = posts.find((p) => p.id == args.input.post_id);

        if (!post) {
          throw new Error("Post not found!");
        }
      }

      const update = { ...comment, ...args.input };
      comments.splice(index, 1, update);
      return comments[index];
    },

    removeComment: (parent, args, contextValue, info) => {
      const comment = comments.find((c) => c.id == args.id);
      const index = comments.indexOf(comment);

      if (!comment) {
        throw new Error("Comment not found!");
      }

      comments.splice(index, 1);
      return comment;
    },
  },
};

export default resolvers;
