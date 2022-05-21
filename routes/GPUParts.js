import express from "express";
// import gpuModel from "../models/gpuModel.js";
import Firestore from "@google-cloud/firestore";

const router = express.Router();
const db = new Firestore();

//all routes start with pcPartsList
router.get('/', async (req, res) => {
    try {
        const document = db.collection('gpuData');
        const getgpu = await document.get();
        res.json(getgpu.docs.map(doc => doc.data()));
    } catch (err) {
        res.json({message: err});
    }
});

//POST to DB
router.post('/', async (req, res) => {
    const datagpu = {
        name: req.body.name,
        price_idr: req.body.price_idr,
        brand: req.body.brand,
        manufacturer: req.body.manufacturer,
        memory: req.body.memory,
        chipset: req.body.chipset,
        is_gaming: req.body.is_gaming,
    };

    try {
        const savedGPU = await db.collection('gpuData').doc().set(datagpu);
        res.json({ status: "success", data: {gpu: savedGPU}});
    } catch (err) {
        res.json({message: err})
    }
});

//Retrieve Specific Product by Brand Name
router.get('/:brand', async (req, res) => {
    try {
        const brand = req.params.brand;
        const queryQ = await db.collection('gpuData').where('brand', '==', brand).get();
        res.json(queryQ.docs.map(doc => doc.data()));
    } catch (err) {
        res.json({message: err});
    }
});

// Retrieve Specific Manufacturer Name
router.get('/search/:manufacturer', async (req, res) => {
    try {
        const manufacturer = req.params.manufacturer;
        const query = await db.collection('gpuData').where('manufacturer', '==', manufacturer).get();
        res.json(query.docs.map(doc => doc.data()));
    } catch (err) {
        res.json({message: err});
    }
});

// //Delete Specific POST
// router.delete('/:id', async (req, res) => {
//     try{
//         const removedGPUData = await gpuModel.remove({_id: req.params.id});
//         res.json(removedGPUData);
//     } catch(err) {
//         res.json({message: err});
//         }
// });

// //Update a POST
// router.patch('/:id', async (req, res) => {
//     try {
//         const updateData = await gpuModel.updateMany({_id: req.params.id},
//             { $set: {name: req.body.name, price_idr: req.body.price_idr, brand: req.body.brand, picture: req.body.picture,
//                 manufacturer: req.body.manufacturer, memory: req.body.memory, chipset: req.body.chipset, is_gaming: req.body.is_gaming} }
//             );
//         res.json(updateData);
//     } catch(err) {
//         res.json({message: err});
//     }
// });

export default router;