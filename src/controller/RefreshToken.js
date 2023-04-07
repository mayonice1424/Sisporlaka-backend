// import usersModel from "../models/users.js";
// import jwt from "jsonwebtoken";

// export const refreshToken = async (req, res) => {
//   try {
//     const refreshToken = req.cookies.refreshToken;
//     if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });
//     const user = await usersModel.findAll({
//       where: {
//         refresh_token: refreshToken
//       }
//     });
//     if (!user[0]) return res.status(403).json({ message: "Forbidden" });
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
//       if (err) return res.status(403).json({ message: "Forbidden" });
//       const userId = user[0].id; 
//       const username = user[0].username;
//       const role = user[0].role;
//       const accessToken = jwt.sign({ userId, username, role }, process.env.ACCESS_TOKEN_SECRET,
//          {
//            expiresIn: "20s"
//          });
//       res.json({ accessToken });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };