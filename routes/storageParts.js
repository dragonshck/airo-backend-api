import express from "express";
import storageModel from "../models/storageModel.js";

const router = express.Router();

//all routes start with pcPartsList
router.get('/', async (req, res) => {
    try {
        const get = await storageModel.find();
        res.json(get);
    } catch (err) {
        res.json({message: err});
    }
});

//POST to DB
router.post('/', async (req, res) => {
    const post = new storageModel({
        name: req.body.name,
        price_idr: req.body.price_idr,
        brand: req.body.brand,
        picture: req.body.picture,
        capacity: req.body.capacity,
        type: req.body.type,
        form_factor: req.body.form_factor,
        interface: req.body.interface
    });

    try {
        const savedStorageData = await post.save();
        res.json(savedStorageData);
    } catch (err) {
        res.json({message: err})
    }
});

//Getting Specific Data from POST
router.get('/:id', async (req, res) => {
    try {
        const getData = await storageModel.findById(req.params.id);
    res.json(getData);
    } catch (err) {
    res.json({message: err});
    }
});

//Delete Specific POST
router.delete('/:id', async (req, res) => {
    try{
        const removedStorageData = await storageModel.remove({_id: req.params.id});
        res.json(removedStorageData);
    } catch(err) {
        res.json({message: err});
        }
});

//Update a POST
router.patch('/:id', async (req, res) => {
    try {
        const updateData = await storageModel.updateMany({_id: req.params.id},
            { $set: {name: req.body.name, price_idr: req.body.price_idr, brand: req.body.brand, picture: req.body.picture,
                capacity: req.body.capacity, type: req.body.type, form_factor: req.body.form_factor, interface: req.body.interface} }
            );
        res.json(updateData);
    } catch(err) {
        res.json({message: err});
    }
});

export default router;