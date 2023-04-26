import dotenv from 'dotenv';
import cors from 'cors';
import usersRoutes from './routes/users.js';
import laporanRoutes from './routes/laporan.js';
import express from 'express';
import icd10Model from './models/icd-10Model.js';
import identitasKorbanModel from './models/identitasKorbanModel.js';
import cookieParser from 'cookie-parser';
import kecamatanModel from './models/kecamatanModel.js';
import laporanPengemudiModel from './models/laporanPengendara.js';
import usersLaporanModel from './models/usersLaporan.js';
import laporanKategoriModel from './models/laporanKategori.js';
import lukaModel from './models/lukaModel.js';
import santunanModel from './models/santunanModels.js';
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
app.use(laporanPengemudiModel)
app.use(usersLaporanModel)
app.use(laporanKategoriModel)
app.use(kecamatanModel)
app.use(identitasKorbanModel)
app.use(icd10Model)
app.use(lukaModel)
app.use(santunanModel)
app.use(identitasSantunanModel)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});