import mongoose from "mongoose";
export const moboSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price_idr: String,
    brand: String,
    picture: String,
    socket_cpu: String,
    form_factor: String,
    max_memory: String,
    memory_slots: Number,
    color: String,
});

export default mongoose.model('moboParts', moboSchema);