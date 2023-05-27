import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRoutes from './routes/users.js';
import lukaRoutes from './routes/luka.js';
import laporanRoutes from './routes/laporan.js';
import icd10Routes from './routes/icd10.js'
import kecamatanRoutes from './routes/kecamatan.js'
import laporanKategoriRoutes from './routes/kategori.js'
import identitasKorbanRoutes from './routes/identitasKorban.js'
import skalaTriaseRoutes from './routes/skalaTriase.js'
import cookieParser from 'cookie-parser';
import santunanRoutes from './routes/santunan.js';
import identitasSantunanModel from './models/identitasSantunanModel.js';
dotenv.config();

const PORT = process.env.PORT || 5000

const app = express();

app.use(cors(
    {
        credentials: true,
        origin: `http://localhost:3000`
    }
))
app.use(cookieParser())

app.use(express.json());
app.use(usersRoutes);
app.use(laporanRoutes);
app.use(lukaRoutes)
app.use(icd10Routes);
app.use(kecamatanRoutes)
app.use(laporanKategoriRoutes)
app.use(identitasKorbanRoutes)
app.use(skalaTriaseRoutes)
app.use(santunanRoutes)
app.use(identitasSantunanModel)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});