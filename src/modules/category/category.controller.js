import { categoryService } from "./category.services.js";
const getCategories = async (req, res) => {
    try {
        const result = await categoryService.getCategories();
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
        const result = await categoryService.getCategoryProviders(name);
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
        const result = await categoryService.getCategoryMeals(providerId, name);
        return res.json({ result });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ error: e.message });
    }
};
export const categoryController = { getCategories, getCategoryProviders, getCategoryMeals };
