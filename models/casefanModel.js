import mongoose from "mongoose";

export const caseFanSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price_idr: String,
    brand: String,
    picture: String,
    size: String,
    color: String,
    rpm: String,
    airflow: String,
    noise_level: String,
    pwm: Boolean
});

export default mongoose.model('casefanParts', caseFanSchema);