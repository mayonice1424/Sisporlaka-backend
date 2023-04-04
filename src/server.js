import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
const PORT = process.env.PORT || 5000
import usersRoutes from './routes/users.js';

import express from 'express';
const app = express();

app.use(cors())
app.use(express.json());
app.use(usersRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});