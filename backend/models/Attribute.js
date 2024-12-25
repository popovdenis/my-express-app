const mongoose = require('mongoose');

const attributeSchema = new mongoose.Schema({
    attribute_code: {
        type: String,
        required: true,
        unique: true,
    },
    label: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
        default: []
    },
    entity_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EntityType',
        required: true,
    },
    is_required: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true, collection: 'eav_attribute' });

attributeSchema.pre('save', async function (next) {
    if (Array.isArray(this.options) && this.options.length === 1 && typeof this.options[0] === 'string') {
        this.options = this.options[0].split(',').map(option => option.trim());
    }
    console.log(this.options)
    next();
})

attributeSchema.index({ entity_type: 1, attribute_code: 1 }, { unique: true });

module.exports = mongoose.model('Attribute', attributeSchema);