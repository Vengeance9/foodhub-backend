"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealsController = void 0;
const meals_service_1 = require("./meals.service");
const pagination_1 = require("../../helpers/pagination");
const getAllMeals = async (req, res) => {
    try {
        const search = req.query.search;
        console.log("Search query:", search);
        const searchString = typeof search === 'string' ? search : undefined;
        const name = req.query.name;
        const description = req.query.description;
        const isAvailable = req.query.isAvailable ? (req.query.isAvailable === 'true' ? true : false) : undefined;
        const category = req.query.category;
        const reviews = req.query.reviews;
        const ratings = Number(req.query.ratings);
        const { page, skip, limit, sortBy, sortOrder } = (0, pagination_1.pagination)(req.query);
        const result = await meals_service_1.mealService.getAllMeals({ search: searchString, name, description, isAvailable, category, reviews, ratings, page, skip, limit, sortBy, sortOrder });
        // console.log(result) 
        return res.status(200).json({ data: result, message: 'Meals fetched successfully' });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Something went wrong', error });
    }
};
const getMealById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: 'Meal id is required' });
        }
        const result = await meals_service_1.mealService.getMealById(id);
        return res.status(200).json({ data: result, message: 'Meal fetched ya ya successfully' });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Something went wrong', error });
    }
};
const getProviders = async (req, res) => {
    try {
        const userId = req.user?.id;
        console.log("userId:", userId);
        const result = await meals_service_1.mealService.getProviders();
        console.log(result);
        return res.status(200).json({ data: result, message: 'Providers fetched successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error });
    }
};
const getProviderById = async (req, res) => {
    try {
        const id = req.params.id;
        const CategoryName = req.query.category;
        if (!id) {
            return res.status(400).json({ message: 'Provider id is required' });
        }
        const result = await meals_service_1.mealService.getProviderById(id, CategoryName);
        return res.status(200).json({ data: result, message: 'Provider fetched successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error });
    }
};
exports.mealsController = { getAllMeals, getMealById, getProviders, getProviderById };
