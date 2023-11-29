const Category = require('../models/category.model');

const createCategory = async (req, res, next) => {
	try {
		const { name } = req.body;
		if (!name) {
			return res.status(400).json({
				message: 'Name is required'
			});
		}
		const category = new Category({
			name
		});
		await category.save();
		res.status(201).json({
			message: 'Category created successfully',
			category
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

//get categories
const getCategories = async (req, res, next) => {
	try {
		const categories = await Category.find();
		res.status(200).json({
			message: 'Categories fetched successfully',
			categories
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

//export functions
exports.createCategory = createCategory;
exports.getCategories = getCategories;
