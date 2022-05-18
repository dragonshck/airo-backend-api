import express from "express";
// import powerSupplyModel from "../models/powerSupplyModel.js";

const router = express.Router();

//all routes start with pcPartsList
router.get('/', async (req, res) => {
    try {
        const get = await powerSupplyModel.find();
        res.json(get);
    } catch (err) {
        res.json({message: err});
    }
});

//POST to DB
router.post('/', async (req, res) => {
    const post = new powerSupplyModel({
        name: req.body.name,
        price_idr: req.body.price_idr,
        brand: req.body.brand,
        picture: req.body.picture,
        efficiency_rating: req.body.efficiency_rating,
        wattage: req.body.wattage,
        form_factor: req.body.form_factor,
        modular: req.body.modular,
    });

    try {
        const savedPSUData = await post.save();
        res.json(savedPSUData);
    } catch (err) {
        res.json({message: err})
    }
});

//Getting Specific Data from POST
router.get('/:id', async (req, res) => {
    try {
        const getData = await powerSupplyModel.findById(req.params.id);
    res.json(getData);
    } catch (err) {
    res.json({message: err});
    }
});

//Delete Specific POST
router.delete('/:id', async (req, res) => {
    try{
        const removedPSUData = await powerSupplyModel.remove({_id: req.params.id});
        res.json(removedPSUData);
    } catch(err) {
        res.json({message: err});
        }
});

//Update a POST
router.patch('/:id', async (req, res) => {
    try {
        const updateData = await powerSupplyModel.updateMany({_id: req.params.id},
            { $set: {name: req.body.name, price_idr: req.body.price_idr, brand: req.body.brand, picture: req.body.picture,
                efficiency_rating: req.body.efficiency_rating, wattage: req.body.wattage, form_factor: req.body.wattage, modular: req.body.modular} }
            );
        res.json(updateData);
    } catch(err) {
        res.json({message: err});
    }
});

export default router;