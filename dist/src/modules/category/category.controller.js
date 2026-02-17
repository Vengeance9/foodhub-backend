"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const category_services_1 = require("./category.services");
const getCategories = async (req, res) => {
    try {
        const result = await category_services_1.categoryService.getCategories();
        return res.json({ categories: result });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ error: e.message });
    }
};
const getCategoryProviders = async (req, res) => {
    try {
        const { name } = req.params;
        const result = await category_services_1.categoryService.getCategoryProviders(name);
        return res.json({ result });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ error: e.message });
    }
};
const getCategoryMeals = async (req, res) => {
    try {
        const { name, providerId } = req.params;
        if (!providerId) {
            return res.status(400).json({ error: "providerId query parameter is required" });
        }
        const result = await category_services_1.categoryService.getCategoryMeals(providerId, name);
        return res.json({ result });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ error: e.message });
    }
};
exports.categoryController = { getCategories, getCategoryProviders, getCategoryMeals };
