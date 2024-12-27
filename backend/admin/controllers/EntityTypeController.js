const EntityType = require('../../models/EntityType');

exports.getList = async (req, res) => {
    try {
        const entityTypes = await EntityType.find();
        res.json({ entityTypes });
    } catch (error) {
        console.error('Error fetching entity types:', error);
        res.status(500).json({ message: 'Failed to fetch entity types' });
    }
};