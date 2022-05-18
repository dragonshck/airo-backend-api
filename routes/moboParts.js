import express from "express";
// import moboModel from "../models/moboModel.js";

const router = express.Router();

//all routes start with pcPartsList
router.get('/', async (req, res) => {
    try {
        const get = await moboModel.find();
        res.json(get);
    } catch (err) {
        res.json({message: err});
    }
});

//POST to DB
router.post('/', async (req, res) => {
    const post = new moboModel({
        name: req.body.name,
        price_idr: req.body.price_idr,
        brand: req.body.brand,
        picture: req.body.picture,
        socket_cpu: req.body.socket_cpu,
        form_factor: req.body.form_factor,
        max_memory: req.body.max_memory,
        color: req.body.color,
    });

    try {
        const savedMoboData = await post.save();
        res.json(savedMoboData);
    } catch (err) {
        res.json({message: err})
    }
});

//Getting Specific Data from POST
router.get('/:id', async (req, res) => {
    try {
        const getData = await moboModel.findById(req.params.id);
    res.json(getData);
    } catch (err) {
    res.json({message: err});
    }
});

//Delete Specific POST
router.delete('/:id', async (req, res) => {
    try{
        const removedMoboData = await moboModel.remove({_id: req.params.id});
        res.json(removedMoboData);
    } catch(err) {
        res.json({message: err});
        }
});

//Update a POST
router.patch('/:id', async (req, res) => {
    try {
        const updateData = await moboModel.updateMany({_id: req.params.id},
            { $set: {name: req.body.name, price_idr: req.body.price_idr, brand: req.body.brand, picture: req.body.picture,
                type: req.body.type, color: req.body.color, power_supply: req.body.power_supply,
            side_panel: req.body.side_panel} }
            );
        res.json(updateData);
    } catch(err) {
        res.json({message: err});
    }
});

export default router;