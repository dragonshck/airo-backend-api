import mongoose from "mongoose";
export const coolerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price_idr: String,
    brand: String,
    picture: String,
    fan_rpm: String,
    color: String,
    noise_level: String
});

export default mongoose.model('coolerParts', coolerSchema);