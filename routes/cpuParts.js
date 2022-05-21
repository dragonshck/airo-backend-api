import express from "express";
// import cpuModel from '../models/cpuModel.js';
import Firestore from "@google-cloud/firestore";

const router = express.Router();
const db = new Firestore();

//Getting All CPU Data from POST
router.get('/', async (req, res) => {
        const document = db.collection('cpuData');
        const getcpu = await document.get();
        res.json(getcpu.docs.map(doc => doc.data()));
});

//POST to DB
router.post('/', async (req, res) => {
    const datacpu = {
        name: req.body.name,
        price_idr: req.body.price_idr,
        brand: req.body.brand,
        core_count: req.body.core_count,
        core_clock: req.body.core_clock,
        tdp: req.body.tdp,
        is_gaming: req.body.is_gaming,
    };

    try {
        await db.collection('cpuData').doc().set(datacpu);
        res.json({status: "success", data: {cpu: datacpu}});
    } catch (err) {
        res.json({ message: err})
    }

});

//Retrieve Specific Product by Brand Name
router.get('/:brand', async (req, res) => {
    try {
        const brand = req.params.brand;
        const queryQ = await db.collection('cpuData').where('brand', '==', brand).get();
        res.json(queryQ.docs.map(doc => doc.data()));
    } catch (err) {
        res.json({message: err});
    }
});

//Retrieve Specific Core Count of CPU
router.get('/search/:core_count', async(req, res) => {
    try {
        const core_count = req.params.core_count;
        const query = await db.collection('cpuData').where('core_count', '==', core_count).get();
        res.json(query.docs.map(doc => doc.data()));
    } catch (err) {
        res.json({message: err});
    }
})

//Delete Specific POST
// router.delete('/:id', async (req, res) => {
//     try{
//         const removedCPUData = await cpuModel.remove({_id: req.params.id});
//         res.json(removedCPUData);
//     } catch(err) {
//         res.json({message: err});
//         }
// });

// //Update a POST
// router.patch('/:id', async (req, res) => {
//     try {
//         const updateData = await cpuModel.updateMany({_id: req.params.id},
//             { $set: {name: req.body.name, price_idr: req.body.price_idr, brand: req.body.brand, picture: req.body.picture,
//                 core_count: req.body.core_count, core_clock: req.body.core_clock, tdp: req.body.tdp, is_gaming: req.body.is_gaming} }
//             );
//         res.json(updateData);
//     } catch(err) {
//         res.json({message: err});
//     }
// });

export default router;