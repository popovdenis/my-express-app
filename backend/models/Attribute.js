const mongoose = require('mongoose');

const attributeSchema = new mongoose.Schema({
    attributeCode: {
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
    entityType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EntityType',
        required: true,
    },
    isRequired: {
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

attributeSchema.index({ entityType: 1, attributeCode: 1 }, { unique: true });

module.exports = mongoose.model('Attribute', attributeSchema);