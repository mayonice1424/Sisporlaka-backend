import dotenv from 'dotenv';
import cors from 'cors';
import usersRoutes from './routes/users.js';
import laporanRoutes from './routes/laporan.js';
import express from 'express';
import cookieParser from 'cookie-parser';
dotenv.config();

const PORT = process.env.PORT || 5000

const app = express();

// app.use(cors(
//     {
//         credentials: true,
//         origin: `http://localhost:3000`
//     }
// ))
app.use(cookieParser())

app.use(express.json());
app.use(usersRoutes);
// app.use(laporanRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});