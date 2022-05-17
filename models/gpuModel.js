import mongoose from "mongoose";

export const gpuSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price_idr: String,
    brand: String,
    picture: String,
    manufacturer: String,
    memory: String,
    chipset: String,
    is_gaming: Boolean,
});

export default mongoose.model('GPUParts', gpuSchema);
