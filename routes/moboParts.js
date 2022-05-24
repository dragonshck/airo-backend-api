import express from "express";
// import moboModel from "../models/moboModel.js";
import { Firestore } from "@google-cloud/firestore";

const router = express.Router();
const db = new Firestore();

//all routes start with pcPartsList
router.get('/', async (req, res) => {
    try {
        const document = db.collection('moboData');
        const getmobo = await document.get();
        res.json(getmobo.docs.map(doc => doc.data()));
    } catch (err) {
        res.json({message: err});
    }
});

//POST to DB
router.post('/', async (req, res) => {
    const datamobo = {
        name: req.body.name,
        price_idr: req.body.price_idr,
        brand: req.body.brand,
        socket_cpu: req.body.socket_cpu,
        form_factor: req.body.form_factor,
        max_memory: req.body.max_memory,
        color: req.body.color,
        description: req.body.description,
    };

    try {
        const savedMoboData = await db.collection('moboData').doc().set(datamobo);
        res.json({ status: "success", data: {mobo: savedMoboData}});
    } catch (err) {
        res.json({message: err})
    }
});

// Getting Specific Product by Brand Name
router.get('/:brand', async (req, res) => {
    try {
        const brand = req.params.brand;
        const queryQ = await db.collection('moboData').where('brand', '==', brand).get();
        res.json(queryQ.docs.map(doc => doc.data()));
    } catch (err) {
        res.json({message: err});
    }
});

// Getting Specific Product by CPU Sockets
router.get('/search/:socket_cpu', async (req, res) => {
    try {
        const socket_cpu = req.params.socket_cpu;
        const query = await db.collection('moboData').where('socket_cpu', '==', socket_cpu).get();
        res.json(query.docs.map(doc => doc.data()));
    } catch (err) {
        res.json({message: err});
    }
});

// //Delete Specific POST
// router.delete('/:id', async (req, res) => {
//     try{
//         const removedMoboData = await moboModel.remove({_id: req.params.id});
//         res.json(removedMoboData);
//     } catch(err) {
//         res.json({message: err});
//         }
// });

// //Update a POST
// router.patch('/:id', async (req, res) => {
//     try {
//         const updateData = await moboModel.updateMany({_id: req.params.id},
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