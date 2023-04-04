import usersModel from "../models/users.js";

export const createNewUser = async (req, res) => {
  try {
    const newUser = await usersModel.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await usersModel.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
