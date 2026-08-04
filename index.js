const express = require("express");
const app = express();

const logger = (req, res, next) => {
  console.log("===============");
  console.log("Method :", req.method);
  console.log("URL    :", req.url);
  console.log("Time   :", new Date().toLocaleString());
  console.log(`${req.method} ${req.url}`);
  console.log("===============");

  next();
};

app.use(logger);

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

app.use(logger);

let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Doe" },
  { id: 4, name: "Smith" },
];

//get Api show data
app.get("/users", auth, (req, res) => {
  res.status(200).json(users);
});

//get api show data sing query param

app.get("/users/search", (req, res) => {
  const { name } = req.query;
  const result = users.filter((user) =>
    user.name.toLowerCase().includes(name.toLowerCase()),
  );
  if (result.length === 0) {
    return res.status(404).json({ message: "No user found" });
  }
  res.status(200).json(result);
});

//post Api add data
app.post("/users", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      message: "Name is required",
    });
  }
  const newUser = req.body;
  users.push(newUser);

  res.status(201).json({
    message: "User added successfully",
    user: newUser,
  });
});

//put Api update data
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!req.body.name) {
    return res.status(400).json({
      message: "Name is required",
    });
  }

  const { name } = req.body;
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.name = name;
  res.status(200).json({
    message: "User updated successfully",
    user: user,
  });
});

//delete Api delete data
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  users = users.filter((user) => user.id !== id);

  res.status(200).json({
    message: "Deleted Successfully",
    users,
  });
});

app.listen(3000, () => {
  console.log("server Started");
});
