import mongoose from 'mongoose';

const bboxSchema = new mongoose.Schema({
    filename: {
        type: String,
        unique: true,
        required: true,
    },
    bbox: {
        type: Object,
        unique: false,
        required: true
    }
});

const BBox = mongoose.model('BBox', bboxSchema);

export default BBox;
