import express from "express";
// import storageModel from "../models/storageModel.js";
import { Firestore } from "@google-cloud/firestore";

const router = express.Router();
const db = new Firestore();

//all routes start with pcPartsList
router.get('/', async (req, res) => {
    try {
        const document = db.collection('storageData');
        const getstorage = await document.get();
        res.json(getstorage.docs.map(doc => doc.data()));
    } catch (err) {
        res.json({message: err});
    }
});

//POST to DB
router.post('/', async (req, res) => {
    const datastorage = {
        name: req.body.name,
        price_idr: req.body.price_idr,
        brand: req.body.brand,
        capacity: req.body.capacity,
        type: req.body.type,
        form_factor: req.body.form_factor,
        connection: req.body.connection,
        description: req.body.description
    };

    try {
        const savedStorageData = await db.collection('storageData').doc().set(datastorage);
        res.json({status: "success", data :{storage: savedStorageData}});
    } catch (err) {
        res.json({message: err})
    }
});

//Getting Specific Data Product by Brand
router.get('/:brand', async (req, res) => {
    try {
        const brand = req.params.brand;
        const queryQ = await db.collection('storageData').where('brand', '==', brand).get();
        res.json(queryQ.docs.map(doc => doc.data()));
    } catch (err) {
        res.json({message: err});
    }
});

// Retrieve Specific Product by Storage Type
router.get('/search/:type', async (req, res) => {
    try {
        const type = req.params.type;
        const qq = await db.collection('storageData').where('type', '==', type).get();
        res.json(qq.docs.map(doc => doc.data()));
    } catch (err) {
        res.json({message: err});
    }
});

// Retrieve Specific Product by Interface (M.2 or SATA)
router.get('/where/:connection', async (req, res) => {
    try {
        const connection = req.params.connection;
        const qx = await db.collection('storageData').where('connection', '==', connection).get();
        res.json(qx.docs.map(doc => doc.data()));
    } catch (err) {
        res.json({message: err});
    }
});

// //Delete Specific POST
// router.delete('/:id', async (req, res) => {
//     try{
//         const removedStorageData = await storageModel.remove({_id: req.params.id});
//         res.json(removedStorageData);
//     } catch(err) {
//         res.json({message: err});
//         }
// });

// //Update a POST
// router.patch('/:id', async (req, res) => {
//     try {
//         const updateData = await storageModel.updateMany({_id: req.params.id},
//             { $set: {name: req.body.name, price_idr: req.body.price_idr, brand: req.body.brand, picture: req.body.picture,
//                 capacity: req.body.capacity, type: req.body.type, form_factor: req.body.form_factor, interface: req.body.interface} }
//             );
//         res.json(updateData);
//     } catch(err) {
//         res.json({message: err});
//     }
// });

export default router;