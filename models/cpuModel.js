import mongoose from "mongoose";

export const cpuSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price_idr: String,
    brand: String,
    picture: String,
    core_count: Number,
    core_clock: String,
    tdp: String,
    is_gaming: Boolean,
});

export default mongoose.model('cpuParts', cpuSchema);

// module.exports = mongoose.model('cpu', cpuSchema);