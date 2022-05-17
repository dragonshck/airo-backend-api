import express from "express";
import gpuModel from "../models/gpuModel.js";

const router = express.Router();

//all routes start with pcPartsList
router.get('/', async (req, res) => {
    try {
        const get = await gpuModel.find();
        res.json(get);
    } catch (err) {
        res.json({message: err});
    }
});

//POST to DB
router.post('/', async (req, res) => {
    const post = new gpuModel({
        name: req.body.name,
        price_idr: req.body.price_idr,
        brand: req.body.brand,
        picture: req.body.picture,
        manufacturer: req.body.manufacturer,
        memory: req.body.memory,
        chipset: req.body.chipset,
        is_gaming: req.body.is_gaming,
    });

    try {
        const savedGPU = await post.save();
        res.json(savedGPU);
    } catch (err) {
        res.json({message: err})
    }
});

//Getting Specific Data from POST
router.get('/:id', async (req, res) => {
    try {
        const post = await gpuModel.findById(req.params.id);
    res.json(post);
    } catch (err) {
    res.json({message: err});
    }
});

//Delete Specific POST
router.delete('/:id', async (req, res) => {
    try{
        const removedGPUData = await gpuModel.remove({_id: req.params.id});
        res.json(removedGPUData);
    } catch(err) {
        res.json({message: err});
        }
});

//Update a POST
router.patch('/:id', async (req, res) => {
    try {
        const updateData = await gpuModel.updateMany({_id: req.params.id},
            { $set: {name: req.body.name, price_idr: req.body.price_idr, brand: req.body.brand, picture: req.body.picture,
                manufacturer: req.body.manufacturer, memory: req.body.memory, chipset: req.body.chipset, is_gaming: req.body.is_gaming} }
            );
        res.json(updateData);
    } catch(err) {
        res.json({message: err});
    }
});

export default router;