dotenv.config();
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import usersRoutes from './routes/users.js';
import laporanRoutes from './routes/laporan.js';
import express from 'express';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 5000
const app = express();

// app.use(session({
//     secret:process.env.SESSION_SECRET,
//     resave : false,
//     saveUninitialized: true,
//     cookie: {
//         secure: 'auto',
//     }
// }))
app.use(cors(
    {
        credentials: true,
        origin: `http://localhost:3000`
    }
))
app.use(express.json());
app.use(usersRoutes);
app.use(laporanRoutes);
app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});