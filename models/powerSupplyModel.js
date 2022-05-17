import mongoose from "mongoose";

export const psuSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price_idr: String,
    brand: String,
    picture: String,
    efficiency_rating: String,
    wattage: String,
    form_factor: String,
    modular: String
});

export default mongoose.model('powerSupplyParts', psuSchema);