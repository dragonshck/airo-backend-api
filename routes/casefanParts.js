import express from "express";
import casefanModel from "../models/casefanModel.js";

const router = express.Router();

//all routes start with pcPartsList
router.get('/', async (req, res) => {
    try {
        const get = await casefanModel.find();
        res.json(get);
    } catch (err) {
        res.json({message: err});
    }
});

//POST to DB
router.post('/', async (req, res) => {
    const post = new casefanModel({
        name: req.body.name,
        price_idr: req.body.price_idr,
        brand: req.body.brand,
        picture: req.body.picture,
        size: req.body.size,
        color: req.body.size,
        rpm: req.body.rpm,
        airflow: req.body.airflow,
        noise_level: req.body.noise_level,
        pwm: req.body.pwm
    });

    try {
        const savedFanData = await post.save();
        res.json(savedFanData);
    } catch (err) {
        res.json({message: err})
    }
});

//Getting Specific Data from POST
router.get('/:id', async (req, res) => {
    try {
        const getData = await casefanModel.findById(req.params.id);
    res.json(getData);
    } catch (err) {
    res.json({message: err});
    }
});

//Delete Specific POST
router.delete('/:id', async (req, res) => {
    try{
        const removedFanData = await casefanModel.remove({_id: req.params.id});
        res.json(removedFanData);
    } catch(err) {
        res.json({message: err});
        }
});

//Update a POST
router.patch('/:id', async (req, res) => {
    try {
        const updateData = await casefanModel.updateMany({_id: req.params.id},
            { $set: {name: req.body.name, price_idr: req.body.price_idr, brand: req.body.brand, picture: req.body.picture,
                size: req.body.size, color: req.body.color, rpm: req.body.rpm, airflow: req.body.airflow, noise_level: req.body.noise_level, pwm: req.body.pwm} }
            );
        res.json(updateData);
    } catch(err) {
        res.json({message: err});
    }
});

export default router;