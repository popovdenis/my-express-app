const mongoose = require('mongoose');

const entityTypeSchema = new mongoose.Schema({
    entityTypeCode: {
        type: String,
        required: true,
        unique: true,
    }
}, { collection: 'eav_entity_type' });

module.exports = mongoose.model('EntityType', entityTypeSchema);