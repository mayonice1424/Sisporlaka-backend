import usersModel from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const createNewUser = async (req, res) => {
   const {username, role, password, confPassword} = req.body;
   if (password !== confPassword) {
     res.status(400).json({ error: "Password dan Confirm Password tidak cocok" });
     return;
    };
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   try{
    await usersModel.create({
      username: username,
      role: role,
      password: hashedPassword
    });
    res.status(201).json({ message: "User berhasil dibuat" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const login = async (req, res) => {
  try {
      const user = await usersModel.findOne({
        where:{
          username: req.body.username
        }
    });
    const match = await bcrypt.compare(req.body.password, user.password);
    if(!match) return res.status(400).json({msg: "Wrong Password"});
    const userId = user.id;
    const username = user.username;
    const role = user.role;
    const accessToken = jwt.sign({userId, username, role}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '20s'
    });
    const refreshToken = jwt.sign({userId, username, role}, process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: '1d'
    });
      await usersModel.update({ refresh_token: refreshToken }, 
        {
           where: { id: user.id} 
      });
      res.cookie('refreshToken', refreshToken,{
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ message: "User tidak ditemukan" });
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await usersModel.findAll({
      attributes: { exclude: ["password", "refresh_token"] },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updatePassword = async (req, res) => {
  try {
    const oldPassword = req.body.oldPassword;
    const salt = await bcrypt.genSalt(10);
    await bcrypt.hash(oldPassword, salt);
    const user = await usersModel.findOne({
      where: {
        id: req.userId
      }
    });
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(400).json({ message: "Password lama tidak cocok" });
    const hashedPassword = await bcrypt.hash( req.body.password, salt);
    const updated = await usersModel.update({ password: hashedPassword }, {
      where: { id: req.userId }
    });
    if ( match && updated) {
      res.status(200).json({ message: "Password berhasil diubah" });
      return;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(204);
  const user = await usersModel.findOne({
    where: {
      refresh_token: refreshToken
    }
  });
  if (!user) return res.status(204);
  const userId = user.id;
  await usersModel.update({ refresh_token: null }, {
    where: { id: userId }
  });
  res.clearCookie("refreshToken");
  return res.status(200).json({ message: "Logout berhasil" });
}

