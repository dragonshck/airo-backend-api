import express from "express";
// import powerSupplyModel from "../models/powerSupplyModel.js";
import { Firestore } from "@google-cloud/firestore";

const router = express.Router();
const db = new Firestore();

//all routes start with pcPartsList
router.get('/', async (req, res) => {
    try {
        const document = db.collection('powerSupplyData');
        const getpsu = await document.get();
        res.json(getpsu.docs.map(doc => doc.data()));
    } catch (err) {
        res.json({message: err});
    }
});

//POST to DB
router.post('/', async (req, res) => {
    const datapsu = {
        name: req.body.name,
        price_idr: req.body.price_idr,
        brand: req.body.brand,
        efficiency_rating: req.body.efficiency_rating,
        wattage: req.body.wattage,
        form_factor: req.body.form_factor,
        modular: req.body.modular,
        description: req.body.description,
    };

    try {
        const savedPSUData = await db.collection('powerSupplyData').doc().set(datapsu);
        res.json({ status: "success", data: {psu: savedPSUData}});
    } catch (err) {
        res.json({message: err})
    }
});

// Getting Specific Product by Brand Name
router.get('/:brand', async (req, res) => {
    try {
        const brand = req.params.brand;
        const queryQ = await db.collection('powerSupplyData').where('brand', '==', brand).get();
        res.json(queryQ.docs.map(doc => doc.data()));
    } catch (err) {
        res.json({message: err});
    }
});

// Retrieve Specific Type of Power Supply by Form Factor
router.get('/search/:form_factor', async (req, res) => {
    try {
        const form_factor = req.params.form_factor;
        const quehrey = await db.collection('powerSupplyData').where('form_factor', '==', form_factor).get();
        res.json(quehrey.docs.map(doc => doc.data()));
    } catch (err) {
        res.json({message: err})
    }
})

// //Delete Specific POST
// router.delete('/:id', async (req, res) => {
//     try{
//         const removedPSUData = await powerSupplyModel.remove({_id: req.params.id});
//         res.json(removedPSUData);
//     } catch(err) {
//         res.json({message: err});
//         }
// });

// //Update a POST
// router.patch('/:id', async (req, res) => {
//     try {
//         const updateData = await powerSupplyModel.updateMany({_id: req.params.id},
//             { $set: {name: req.body.name, price_idr: req.body.price_idr, brand: req.body.brand, picture: req.body.picture,
//                 efficiency_rating: req.body.efficiency_rating, wattage: req.body.wattage, form_factor: req.body.wattage, modular: req.body.modular} }
//             );
//         res.json(updateData);
//     } catch(err) {
//         res.json({message: err});
//     }
// });

export default router;