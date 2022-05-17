import mongoose from "mongoose";
export const ramSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price_idr: String,
    brand: String,
    picture: String,
    speed: String,
    modules: String,
    color: String,
    is_gaming: Boolean
});

export default mongoose.model('ramParts', ramSchema);