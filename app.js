import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import {} from 'dotenv/config';

import cpuRoutes from "./routes/cpuParts.js";
import moboRoutes from "./routes/moboParts.js";
import caseRoutes from "./routes/caseParts.js";
import CPUcoolerRoutes from "./routes/coolerParts.js";
import GPURoutes from "./routes/GPUParts.js";
import PSURoutes from "./routes/powerSupplyParts.js";
import RAMRoutes from "./routes/ramParts.js";
import casefanRoutes from "./routes/casefanParts.js";
import storageRoutes from "./routes/storageParts.js";

const app = express();
const PORT = 5000;

//Routes
app.use(bodyParser.json());

app.use('/cpu', cpuRoutes);
app.use('/motherboard', moboRoutes);
app.use('/case', caseRoutes);
app.use('/CPUCooler', CPUcoolerRoutes);
app.use('/GPU', GPURoutes);
app.use('/powerSupply', PSURoutes);
app.use('/RAM', RAMRoutes);
app.use('/caseFan', casefanRoutes);
app.use('/storage', storageRoutes);

app.get('/', (req, res) => {
    res.send('Hello from Homepage.')
});

//Database Connection
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('connected!')
});


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));