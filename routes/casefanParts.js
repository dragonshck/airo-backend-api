import express from "express";
// import casefanModel from "../models/casefanModel.js";
import { Firestore } from "@google-cloud/firestore";

const router = express.Router();
const db = new Firestore();

//all routes start with pcPartsList
router.get('/', async (req, res) => {
    try {
        const document = db.collection('caseFanData');
        const getCaseFan = await document.get();
        res.json(getCaseFan.docs.map(doc => doc.data()));
    } catch (err) {
        res.json({message: err});
    }
});

//POST to DB
router.post('/', async (req, res) => {
    const dataCaseFan = {
        name: req.body.name,
        price_idr: req.body.price_idr,
        brand: req.body.brand,
        size: req.body.size,
        color: req.body.size,
        rpm: req.body.rpm,
        airflow: req.body.airflow,
        noise_level: req.body.noise_level,
        pwm: req.body.pwm,
        description: req.body.description
    };

    try {
        const savedFanData = await db.collection('caseFanData').doc().set(dataCaseFan);
        res.json({ status: "success", data: {case: savedFanData}});
    } catch (err) {
        res.json({message: err})
    }
});

//Getting Specific Case Fan by Brand
router.get('/:brand', async (req, res) => {
    try {
        const brand = req.params.brand;
        const queryQ = await db.collection('caseFanData').where('brand', '==', brand).get();
        res.json(queryQ.docs.map(doc => doc.data()));
    } catch (err) {
        res.json({message: err});
    }
});

//Retrieve Fan Size
router.get('/where/:size', async (req, res) => {
    try {
        const size = req.params.size;
        const qx = await db.collection('caseFanData').where('size', '==', size).get();
        res.json(qx.docs.map(doc => doc.data()));
    } catch (err) {
        res.json({message: err});
    }
});

// //Delete Specific POST
// router.delete('/:id', async (req, res) => {
//     try{
//         const removedFanData = await casefanModel.remove({_id: req.params.id});
//         res.json(removedFanData);
//     } catch(err) {
//         res.json({message: err});
//         }
// });

// //Update a POST
// router.patch('/:id', async (req, res) => {
//     try {
//         const updateData = await casefanModel.updateMany({_id: req.params.id},
//             { $set: {name: req.body.name, price_idr: req.body.price_idr, brand: req.body.brand, picture: req.body.picture,
//                 size: req.body.size, color: req.body.color, rpm: req.body.rpm, airflow: req.body.airflow, noise_level: req.body.noise_level, pwm: req.body.pwm} }
//             );
//         res.json(updateData);
//     } catch(err) {
//         res.json({message: err});
//     }
// });

export default router;