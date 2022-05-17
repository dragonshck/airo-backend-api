import mongoose from "mongoose";

export const storageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price_idr: String,
    brand: String,
    picture: String,
    capacity: String,
    type: String,
    form_factor: String,
    interface: String
});

export default mongoose.model('storageParts', storageSchema);