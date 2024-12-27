const Attribute = require('../../models/Attribute');
const AttributeRepository = require('../../models/AttributeRepository');

exports.getList = async (req, res) => {
    try {
        const { filter, sort, page = 1, limit = 10 } = req.query;

        const filters = filter ? JSON.parse(filter) : {};
        const skip = (page - 1) * limit;

        const { items, total } = await AttributeRepository.getList(filters, sort, skip, Number(limit));

        res.json({
            attributes: items,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit)),
        });
    } catch (error) {
        console.error('Error fetching attributes:', error);
        res.status(500).json({ message: 'Failed to fetch attributes: ' + error.message });
    }
};
exports.addEntity = async (req, res) => {
    try {
        const { attributeCode, label, options, entityType, isRequired } = req.body;

        if (!attributeCode) {
            return res.status(400).json({ message: 'Please fill the required fields' });
        }

        const existingAttribute = await AttributeRepository.findByCode(attributeCode);
        if (existingAttribute) {
            return res.status(400).json({ message: 'The attribute with the sam attribute  already exists' });
        }

        const newEntity = await AttributeRepository.createEntity({
            attributeCode,
            label,
            options,
            entityType,
            isRequired
        });

        res.status(201).json({ message: 'Attribute created successfully', attribute: newEntity });
    } catch (error) {
        console.error('Error creating attribute:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.getAttributeByCode = async (req, res) => {
    const { attributeCode } = req.params;

    try {
        const attribute = await Attribute.findOne({ attributeCode: attributeCode })
            .populate('entityType', 'entityTypeCode');

        if (!attribute) {
            return res.status(404).json({ message: 'Attribute not found' });
        }

        res.status(200).json({ attribute });
    } catch (error) {
        console.error('Error fetching attribute:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.getAttributesByEntityType = async (req, res) => {
    const { entityTypeCode } = req.params;

    try {
        const attributes = await Attribute.aggregate([
            {
                $lookup: {
                    from: 'eav_entity_type',
                    localField: 'entityType',
                    foreignField: '_id',
                    as: 'entityType',
                },
            },
            {$unwind: '$entityType'},
            {$match: {'entityType.entityTypeCode': entityTypeCode}},
            {
                $project: {
                    _id: 1,
                    attributeCode: 1,
                    label: 1,
                    options: 1,
                    isRequired: 1,
                    'entityType.entityTypeCode': 1,
                },
            },
        ]);

        res.status(200).json({ attributes });
    } catch (error) {
        console.error('Error fetching attribute:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.getEntity = async (req, res) => {
    try {
        const attribute = await Attribute.findById(req.params.id);
        if (!attribute) {
            return res.status(404).json({ message: 'Attribute not found' });
        }
        res.status(200).json({ attribute });
    } catch (error) {
        console.error('Error getting attribute:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.updateEntity = async (req, res) => {
    try {
        const { id } = req.params;
        const { attributeCode, label, options, entityType, isRequired } = req.body;

        const attribute = await Attribute.findById(id);
        if (!attribute) {
            return res.status(404).json({ message: 'Attribute not found' });
        }

        attribute.attributeCode = attributeCode || attribute.attributeCode;
        attribute.label = label || attribute.label;
        attribute.options = options || attribute.options;
        attribute.entityType = entityType || attribute.entityType;
        attribute.isRequired = isRequired;

        const updatedEntity = await AttributeRepository.updateEntity(id, attribute);
        res.status(200).json({ message: 'Attribute updated successfully', attribute: updatedEntity });
    } catch (error) {
        console.error('Error updating attribute:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.deleteEntity = async (req, res) => {
    try {
        const { id } = req.params;

        const attribute = await AttributeRepository.deleteEntity(id);
        if (!attribute) {
            return res.status(404).json({ message: 'Attribute not found' });
        }

        res.json({ message: 'Attribute deleted successfully' });
    } catch (error) {
        console.error('Error deleting attribute:', error);
        res.status(500).json({ message: 'Failed to delete attribute' });
    }
};