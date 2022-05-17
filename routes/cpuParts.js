import express from "express";
import cpuModel from '../models/cpuModel.js';

const router = express.Router();

//Getting All CPU Data from POST
router.get('/', async (req, res) => {
    try {
        const post = await cpuModel.find();
        res.json(post);
    } catch (err) {
        res.json({message: err});
    }
});

//POST to DB
router.post('/', async (req, res) => {
    const post = new cpuModel({
        name: req.body.name,
        price_idr: req.body.price_idr,
        brand: req.body.brand,
        picture: req.body.picture,
        core_count: req.body.core_count,
        core_clock: req.body.core_clock,
        tdp: req.body.tdp,
        is_gaming: req.body.is_gaming,
    });

    try {
        const savedCPU = await post.save();
        res.json(savedCPU);
    } catch (err) {
        res.json({ message: err})
    }

});

//Getting Specific Data from POST
router.get('/:id', async (req, res) => {
    try {
        const post = await cpuModel.findById(req.params.id);
    res.json(post);
    }catch(err) {
    res.json({message: err});
    }
});

//Delete Specific POST
router.delete('/:id', async (req, res) => {
    try{
        const removedCPUData = await cpuModel.remove({_id: req.params.id});
        res.json(removedCPUData);
    } catch(err) {
        res.json({message: err});
        }
});

//Update a POST
router.patch('/:id', async (req, res) => {
    try {
        const updateData = await cpuModel.updateMany({_id: req.params.id},
            { $set: {name: req.body.name, price_idr: req.body.price_idr, brand: req.body.brand, picture: req.body.picture,
                core_count: req.body.core_count, core_clock: req.body.core_clock, tdp: req.body.tdp, is_gaming: req.body.is_gaming} }
            );
        res.json(updateData);
    } catch(err) {
        res.json({message: err});
    }
});

export default router;