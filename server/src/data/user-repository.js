const users = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@hicoders.ch",
  },
  {
    id: 2,
    name: "Peter Parker",
    email: "peter_parker@hicoders.ch",
  },
];

const findAllusers = () => {
  return users;
};

const findUserById = (pId) => {
  const searchedUser = users.find((user) => user.id == pId);
  return searchedUser;
};

export default {
  findAllusers,
  findUserById,
};
