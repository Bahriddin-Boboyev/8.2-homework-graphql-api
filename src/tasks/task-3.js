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
    users: () => users,
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
};

export default resolvers;
