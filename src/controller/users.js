import usersModel from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const createNewUser = async (req, res) => {
   const {username, role, password, confPassword} = req.body;
   if (password !== confPassword) {
     res.status(400).json({ error: "Password dan Confirm Password tidak cocok" });
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
    const user = await usersModel.findAll({
      where: {
        username: req.body.username
      }
    });
      const match = await bcrypt.compare(req.body.password, user[0].password);
      if (!match) return res.status(400).json({ message: "Login Gagal" });
      const userId = user[0].id;
      const username = user[0].username;
      const role = user[0].role;
      const accessToken = jwt.sign({ userId, username, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20s" });
      const refreshToken = jwt.sign({ userId, username, role }, process.env.REFRESH_TOKEN_SECRET,{ expiresIn: "1d" });
      await usersModel.update({ refresh_token: refreshToken }, 
        {
           where: { id: userId } 
      });
      res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true , maxAge:24*60*60*1000});
      res.json({ accessToken, refreshToken });
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

// export const updateUser = async (req, res) => {
//   const { id } = req.params;
//   const { username, role } = req.body;
//   try {
//     const getUser = await usersModel.findAll({
//       where: { id: id }
//     });
//     if (getUser) {
//       const updated = await usersModel.update({ username: username, role: role }, {
//         where: { id: id }
//       });
//       res.status(200).json( updated, { message: "User berhasil diubah" });
//     } else {
//       res.status(404).json({ message: "User tidak ditemukan" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }


// export const updatePassword = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { password, confPassword } = req.body;
//     if (password !== confPassword) {
//       res.status(401).json({ error: "Password dan Confirm Password tidak cocok" });
//     };
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const updated = await usersModel.update({ password: hashedPassword }, {
//       where: { id: id }
//     });
//     if (updated) {
//       res.status(200).json({ message: "Password berhasil diubah" });
//     } else {
//       throw new Error("User not found");
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }


// export const updatePassword = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await usersModel.findAll({
//       where: {
//         id: req.body.id
//       }
//     });
//       const match = await bcrypt.compare(req.body.password, user[0].password);
//       if (!match) return res.status(400).json({ message: "Password dan Confirm Password tidak cocok" });
//       const userId = user[0].id;
//       const password = user[0].password;
//       const accessToken = jwt.sign({ userId, password }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20s" });
//       const refreshToken = jwt.sign({ userId, password }, process.env.REFRESH_TOKEN_SECRET,{ expiresIn: "1d" });
//       await usersModel.update(id,{ password: password , refresh_token: refreshToken }, 
//         {
//            where: { id: userId } 
//       });
//       res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true , maxAge:24*60*60*1000});
//       res.json({ accessToken, refreshToken });
//   } catch (error) {
//     res.status(404).json({ message: "User tidak ditemukan" });
//   }
// }

// export const updatePassword = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { password, confPassword } = req.body;
//     if (password !== confPassword) {
//       res.status(401).json({ error: "Password dan Confirm Password tidak cocok" });
//     };
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const updated = await usersModel.update({ password: hashedPassword }, {
//       where: { id: id }
//     });
//     if (updated) {
//       res.status(200).json({ message: "Password berhasil diubah" });
//     } else {
//       throw new Error("User not found");
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }



// export const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const [updated] = await usersModel.update(req.body, {
//       where: { id: id }
//     });
//     if (updated) {
//       const updatedUser = await usersModel.findOne({ where: { id: id } });
//       res.status(200).json(updatedUser);
//     } else {
//       throw new Error("User not found");
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }
