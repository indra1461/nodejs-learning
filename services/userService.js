const users = require("../data/users");

//get all users service
const getAllUsers = () => {
  return users;
};

//create user service
const addUser = (user) => {
  if (!user.name || user.name.trim() === "") {
    return null;
  }

  const newUser = {
    id: users.length + 1,
    name: user.name,
  };

  users.push(newUser);

  return newUser;
};

//update user service
const updateUser = (id, user) => {
  const existingUser = users.find((user) => user.id === parseInt(id));
  if (!existingUser) {
    return null;
  }
  existingUser.name = user.name;
  return existingUser;
};

//delete user service
const deleteUser = (id) => {
  const userToDelete = users.find((user) => user.id === parseInt(id));
  if (userToDelete) {
    users.splice(users.indexOf(userToDelete), 1);
    return userToDelete;
  }
  return null;
};

module.exports = {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
};
