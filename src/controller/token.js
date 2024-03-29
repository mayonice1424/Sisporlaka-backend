import jwt from "jsonwebtoken";
import usersModel from "../models/users.js";

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const user = await usersModel.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id_users;
            const username = user[0].username;
            const role = user[0].role;
            const accessToken = jwt.sign({userId, username, role}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15s'
            });
            res.json({ userId, role });
        });
    } catch (error) {
        console.log(error);
    }
}