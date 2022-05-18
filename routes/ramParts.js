import express from "express";
// import ramModel from "../models/ramModel.js";
import { Firestore } from "@google-cloud/firestore";

const router = express.Router();
const db = new Firestore();

//all routes start with pcPartsList
router.get('/', async (req, res) => {
    try {
        const document = db.collection('ramData');
        const getram = await document.get();
        res.json(getram.docs.map(doc => doc.data()));
    } catch (err) {
        res.json({message: err});
    }
});

//POST to DB
router.post('/', async (req, res) => {
    const dataram = {
        name: req.body.name,
        price_idr: req.body.price_idr,
        brand: req.body.brand,
        speed: req.body.speed,
        modules: req.body.modules,
        color: req.body.color,
        is_gaming: req.body.is_gaming
    };

    try {
        const savedRAMData = await db.collection('ramData').doc().set(dataram);
        res.json({ status: "success", data: {ram: savedRAMData}});
    } catch (err) {
        res.json({message: err})
    }
});

// //Getting Specific Data from POST
// router.get('/:id', async (req, res) => {
//     try {
//         const getData = await ramModel.findById(req.params.id);
//     res.json(getData);
//     } catch (err) {
//     res.json({message: err});
//     }
// });

// //Delete Specific POST
// router.delete('/:id', async (req, res) => {
//     try{
//         const removedRAMData = await ramModel.remove({_id: req.params.id});
//         res.json(removedRAMData);
//     } catch(err) {
//         res.json({message: err});
//         }
// });

// //Update a POST
// router.patch('/:id', async (req, res) => {
//     try {
//         const updateData = await ramModel.updateMany({_id: req.params.id},
//             { $set: {name: req.body.name, price_idr: req.body.price_idr, brand: req.body.brand, picture: req.body.picture,
//                 speed: req.body.speed, modules: req.body.modules ,color: req.body.color, is_gaming: req.body.color} }
//             );
//         res.json(updateData);
//     } catch(err) {
//         res.json({message: err});
//     }
// });

export default router;