import express from "express";
// import coolerModel from "../models/coolerModel.js";
import { Firestore } from "@google-cloud/firestore";

const router = express.Router();
const db = new Firestore();

//all routes start with pcPartsList
router.get('/', async (req, res) => {
    try {
        const document = db.collection('cpuCoolerData');
        const getcpucooler = await document.get();
        res.json(getcpucooler.docs.map(doc => doc.data()));
    } catch (err) {
        res.json({message: err});
    }
});

//POST to DB
router.post('/', async (req, res) => {
    const dataCoolerCpu = {
        name: req.body.name,
        price_idr: req.body.price_idr,
        brand: req.body.brand,
        fan_rpm: req.body.fan_rpm,
        color: req.body.color,
        noise_level: req.body.noise_level
    };

    try {
        const savedCoolerData = await db.collection('cpuCoolerData').doc().set(dataCoolerCpu);
        res.json({ status: "success", data: {case: savedCoolerData}});
    } catch (err) {
        res.json({message: err})
    }
});

// //Getting Specific Data from POST
// router.get('/:id', async (req, res) => {
//     try {
//         const getData = await coolerModel.findById(req.params.id);
//     res.json(getData);
//     } catch (err) {
//     res.json({message: err});
//     }
// });

// //Delete Specific POST
// router.delete('/:id', async (req, res) => {
//     try{
//         const removedCoolerData = await coolerModel.remove({_id: req.params.id});
//         res.json(removedCoolerData);
//     } catch(err) {
//         res.json({message: err});
//         }
// });

// //Update a POST
// router.patch('/:id', async (req, res) => {
//     try {
//         const updateData = await coolerModel.updateMany({_id: req.params.id},
//             { $set: {name: req.body.name, price_idr: req.body.price_idr, brand: req.body.brand, picture: req.body.picture,
//                 fan_rpm: req.body.fan_rpm, color: req.body.color, noise_level: req.body.noise_level} }
//             );
//         res.json(updateData);
//     } catch(err) {
//         res.json({message: err});
//     }
// });

export default router;