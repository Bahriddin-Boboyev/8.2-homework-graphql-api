const users = [
  {
    id: "1",
    first_name: "John",
    last_name: "Doe",
    group_id: "1",
  },
  {
    id: "2",
    first_name: "Bill",
    last_name: "Gates",
    group_id: "1",
  },
  {
    id: "3",
    first_name: "Elon",
    last_name: "Musk",
    group_id: "2",
  },
];

const groups = [
  {
    id: "1",
    name: "Frontend Full Stack N78",
  },
  {
    id: "2",
    name: "Backend Full Stack N82",
  },
];

const resolvers = {
  Query: {
    groups: () => groups,
    group: (parent, args, contextValue, info) => {
      const group = groups.find((g) => g.id == args.id);
      if (!group) {
        throw new Error("Group not found!");
      }
      return group;
    },

    users: () => users,
    user: (parent, args, contextValue, info) => {
      const user = users.find((u) => u.id == args.id);
      if (!user) {
        throw new Error("User not found!");
      }
      return user;
    },
  },
  User: {
    groups: (parent) => {
      return groups.filter((group) => group.id === parent.group_id);
    },
  },
  Group: {
    users: (parent) => {
      return users.filter((user) => user.group_id === parent.id);
    },
  },

  Mutation: {
    createGroup: (parent, args, contextValue, info) => {
      groups.push({
        id: groups.length + 1,
        name: args.input.name,
      });
      return groups.at(-1);
    },

    updateGroup: (parent, args, contextValue, info) => {
      const group = groups.find((g) => g.id == args.id);
      const index = groups.indexOf(group);
      if (!group) {
        throw new Error("Group not found!");
      }
      const update = { ...group, ...args.input };
      groups.splice(index, 1, update);
      return groups[index];
    },
    removeGroup: (parent, args, contextValue, info) => {
      const group = groups.find((g) => g.id == args.id);
      const index = groups.indexOf(group);

      if (!group) {
        throw new Error("Group not found!");
      }

      groups.splice(index, 1);
      return group;
    },

    ///////////////////////////////////

    createUser: (parent, args, contextValue, info) => {
      const group = groups.find((g) => g.id == args.input.group_id);
      const index = groups.indexOf(group);
      if (!group) {
        throw new Error("Group not found!");
      }

      users.push({
        id: users.length + 1,
        first_name: args.input.first_name,
        last_name: args.input.last_name,
        group_id: args.input.group_id,
      });
      return users.at(-1);
    },

    updateUser: (parent, args, contextValue, info) => {
      const user = users.find((u) => u.id == args.id);
      const index = users.indexOf(user);
      if (!user) {
        throw new Error("user not found!");
      }

      if (args.input.group_id) {
        const group = groups.find((u) => u.id == args.id);
        if (!group) {
          throw new Error("Group not found!");
        }
      }

      const update = { ...user, ...args.input };
      users.splice(index, 1, update);
      return users[index];
    },
  },
};

export default resolvers;
