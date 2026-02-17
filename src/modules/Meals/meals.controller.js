import { mealService } from "./meals.service";
import { pagination } from "../../helpers/pagination";
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
        const { page, skip, limit, sortBy, sortOrder } = pagination(req.query);
        const result = await mealService.getAllMeals({ search: searchString, name, description, isAvailable, category, reviews, ratings, page, skip, limit, sortBy, sortOrder });
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
        const result = await mealService.getMealById(id);
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
        const result = await mealService.getProviders();
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
        const result = await mealService.getProviderById(id, CategoryName);
        return res.status(200).json({ data: result, message: 'Provider fetched successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error });
    }
};
export const mealsController = { getAllMeals, getMealById, getProviders, getProviderById };
