import mongoose from "mongoose";

export const caseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price_idr: String,
    brand: String,
    picture: String,
    type: String,
    color: String,
    power_supply: String,
    side_panel: String,
});

export default mongoose.model('caseParts', caseSchema);