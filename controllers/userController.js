const {
  getAllUsers,
  addUser,
  updateUser: updateUserService,
  deleteUser: deleteUserService,
} = require("../services/userService");

//get users controller
const getUsers = (req, res) => {
  const users = getAllUsers();
  res.status(200).json(users);
};

//create user controller
const createUser = (req, res) => {
  const singleUser = addUser(req.body);

  if (!singleUser) {
    return res.status(400).json({
      message: "Name is required",
    });
  }

  return res.status(201).json(singleUser);
};

//update user controller
const updateUser = (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      message: "Name is required",
    });
  }
  const updatedUser = updateUserService(req.params.id, req.body);
  if (!updatedUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  return res.status(200).json({
    message: "User updated successfully",
    user: updatedUser,
  });
};

//delete user controller
const deleteUser = (req, res) => {
  const deletedUser = deleteUserService(req.params.id);
  if (!deletedUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  return res.status(200).json({
    message: "User deleted successfully",
    user: deletedUser,
  });
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
