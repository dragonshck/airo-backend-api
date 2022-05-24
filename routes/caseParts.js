import express from "express";
// import caseModel from "../models/caseModel.js";
import { Firestore } from "@google-cloud/firestore";

const router = express.Router();
const db = new Firestore();

//all routes start with pcPartsList
router.get('/', async (req, res) => {
    try {
        const document = db.collection('caseData');
        const getcase = await document.get();
        res.json(getcase.docs.map(doc => doc.data()));
    } catch (err) {
        res.json({message: err});
    }
});

//POST to DB
router.post('/', async (req, res) => {
    const datacase = {
        name: req.body.name,
        price_idr: req.body.price_idr,
        brand: req.body.brand,
        type: req.body.type,
        color: req.body.color,
        power_supply: req.body.power_supply,
        side_panel: req.body.side_panel,
        description: req.body.description,
    };

    try {
        const savedCaseData = await db.collection('caseData').doc().set(datacase);
        res.json({ status: "success", data: {case: savedCaseData}});
    } catch (err) {
        res.json({message: err})
    }
});

//Getting Specific Case by Brand
router.get('/:brand', async (req, res) => {
    try {
        const brand = req.params.brand;
        const queryQ = await db.collection('caseData').where('brand', '==', brand).get();
        res.json(queryQ.docs.map(doc => doc.data()));
    } catch (err) {
        res.json({message: err});
    }
});

//Getting Case Type
router.get('/search/:type', async (req, res) => {
    try {
        const type = req.params.type;
        const qq = await db.collection('caseData').where('type', '==', type).get();
        res.json(qq.docs.map(doc => doc.data()));
    } catch (err) {
        res.json({message: err});
    }
});

//Retrieve Case Colors
router.get('/where/:color', async (req, res) => {
    try {
        const color = req.params.color;
        const qx = await db.collection('caseData').where('color', '==', color).get();
        res.json(qx.docs.map(doc => doc.data()));
    } catch (err) {
        res.json({message: err});
    }
});

// //Delete Specific POST
// router.delete('/:id', async (req, res) => {
//     try{
//         const removedCaseData = await caseModel.remove({_id: req.params.id});
//         res.json(removedCaseData);
//     } catch(err) {
//         res.json({message: err});
//         }
// });

// //Update a POST
// router.patch('/:id', async (req, res) => {
//     try {
//         const updateData = await caseModel.updateMany({_id: req.params.id},
//             { $set: {name: req.body.name, price_idr: req.body.price_idr, brand: req.body.brand, picture: req.body.picture,
//                 type: req.body.type, color: req.body.color, power_supply: req.body.power_supply,
//             side_panel: req.body.side_panel} }
//             );
//         res.json(updateData);
//     } catch(err) {
//         res.json({message: err});
//     }
// });

export default router;