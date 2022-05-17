import express from "express";
import caseModel from "../models/caseModel.js";

const router = express.Router();

//all routes start with pcPartsList
router.get('/', async (req, res) => {
    try {
        const get = await caseModel.find();
        res.json(get);
    } catch (err) {
        res.json({message: err});
    }
});

//POST to DB
router.post('/', async (req, res) => {
    const post = new caseModel({
        name: req.body.name,
        price_idr: req.body.price_idr,
        brand: req.body.brand,
        picture: req.body.picture,
        type: req.body.type,
        color: req.body.color,
        power_supply: req.body.power_supply,
        side_panel: req.body.side_panel,
    });

    try {
        const savedCaseData = await post.save();
        res.json(savedCaseData);
    } catch (err) {
        res.json({message: err})
    }
});

//Getting Specific Data from POST
router.get('/:id', async (req, res) => {
    try {
        const getData = await caseModel.findById(req.params.id);
    res.json(getData);
    } catch (err) {
    res.json({message: err});
    }
});

//Delete Specific POST
router.delete('/:id', async (req, res) => {
    try{
        const removedCaseData = await caseModel.remove({_id: req.params.id});
        res.json(removedCaseData);
    } catch(err) {
        res.json({message: err});
        }
});

//Update a POST
router.patch('/:id', async (req, res) => {
    try {
        const updateData = await caseModel.updateMany({_id: req.params.id},
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