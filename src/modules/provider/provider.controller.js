import { providerServices } from "./provider.services";
//import { prisma } from "../../lib/prisma.js";
import cloudinary from "../../config/cloudinary";
const register = async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        return res.status(400).json({ message: "User id is required" });
    }
    try {
        let imageUrl;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "providers",
            });
            imageUrl = result.secure_url;
        }
        const isOpen = req.body.isOpen
            ? req.body.isOpen === "true"
                ? true
                : false
            : true;
        let cuisineTypeArray;
        if (typeof req.body.cuisineType === "string") {
            try {
                const cleanedString = req.body.cuisineType.trim();
                cuisineTypeArray = JSON.parse(cleanedString);
            }
            catch (error) {
                cuisineTypeArray = req.body.cuisineType
                    .split(",")
                    .map((item) => item.trim());
            }
        }
        else if (Array.isArray(req.body.cuisineType)) {
            cuisineTypeArray = req.body.cuisineType;
        }
        else {
            cuisineTypeArray = [];
        }
        const providerData = {
            ...req.body,
            isOpen,
            cuisineType: cuisineTypeArray,
            image: imageUrl,
        };
        const result = await providerServices.register(userId, providerData);
        return res
            .status(201)
            .json({ data: result, message: "Provider registered successfully" });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
};
const getMyProviders = async (req, res) => {
    try {
        const userId = req.user?.id;
        const search = req.query.searchTerm;
        console.log("this is the search query:", search);
        const result = await providerServices.getMyProviders(userId, search);
        console.log(result);
        return res
            .status(200)
            .json({ data: result, message: "Providers fetched successfully" });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
};
const getProviderOrders = async (req, res) => {
    const providerId = req.params.providerId;
    //console.log("PROVIDER ID:", providerId);
    // console.log('yayyyyaaaa')
    try {
        const result = await providerServices.getProviderOrders(providerId);
        return res
            .status(200)
            .json({ data: result, message: "Orders fetched successfully" });
    }
    catch (e) {
        console.log(e.message);
        res.status(500).json({ message: e.message });
    }
};
const createMeal = async (req, res) => {
    try {
        console.log("RAW BODY:", req.body);
        console.log("NAME FIELD:", req.body.name);
        let imageUrl;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "providers",
            });
            imageUrl = result.secure_url;
        }
        const providerId = req.params.id;
        console.log(providerId);
        const isAvailable = req.body.isAvailable
            ? req.body.isAvailable === "true"
                ? true
                : false
            : true;
        const result = await providerServices.createMeal(req.body, imageUrl, providerId, isAvailable);
        return res
            .status(201)
            .json({ data: result, message: "Meal created successfully" });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
    }
};
const updateMeal = async (req, res) => {
    try {
        const mealId = req.params.id;
        let imageUrl;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "providers",
            });
            imageUrl = result.secure_url;
        }
        console.log("RAW BODY:", req.body);
        console.log(typeof req.body.isAvailable, req.body.isAvailable);
        const isAvailable = req.body.isAvailable
            ? req.body.isAvailable === "true"
                ? true
                : false
            : undefined;
        const updatedData = {
            ...req.body,
            isAvailable: isAvailable,
            image: imageUrl,
        };
        const result = await providerServices.updateMeal(updatedData, mealId);
        return res
            .status(200)
            .json({ data: result, message: "Meal updated successfully" });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
};
const deleteMeal = async (req, res) => {
    const providerId = req.user?.id;
    const mealId = req.params.id;
    console.log(providerId, mealId);
    try {
        await providerServices.deleteMeal(mealId, providerId);
        return res.status(200).json({ message: "Meal deleted successfully" });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
};
const getAllProviders = async (req, res) => {
    try {
        const result = await providerServices.getAllProviders();
        return res
            .status(200)
            .json({ data: result, message: "Providers fetched successfully" });
    }
    catch (e) {
        res.status(500).json({ message: "Internal server error" });
    }
};
const getProviderMeals = async (req, res) => {
    const providerId = req.params.id;
    try {
        const result = await providerServices.getProviderMeals(providerId);
        return res
            .status(200)
            .json({ data: result, message: "Meals fetched successfully" });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
};
const updateOrderStatus = async (req, res) => {
    const userId = req.user?.id;
    const orderId = req.params.id;
    const { status } = req.body;
    const validStatuses = ["PENDING", "ON_THE_WAY", "PREPARING", "DELIVERED"];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }
    try {
        const result = await providerServices.updateOrderStatus(orderId, status, userId);
        return res
            .status(200)
            .json({ data: result, message: "Order status updated successfully" });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
};
const updateProvider = async (req, res) => {
    const providerId = req.params.id;
    const userId = req.user?.id;
    console.log(providerId, userId);
    try {
        let imageUrl;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "providers",
            });
            imageUrl = result.secure_url;
        }
        const isOpen = req.body.isOpen
            ? req.body.isOpen === "true"
                ? true
                : false
            : true;
        let cuisineTypeArray;
        if (typeof req.body.cuisineType === "string") {
            try {
                const cleanedString = req.body.cuisineType.trim();
                cuisineTypeArray = JSON.parse(cleanedString);
            }
            catch (error) {
                cuisineTypeArray = req.body.cuisineType
                    .split(",")
                    .map((item) => item.trim());
            }
        }
        else if (Array.isArray(req.body.cuisineType)) {
            cuisineTypeArray = req.body.cuisineType;
        }
        else {
            cuisineTypeArray = [];
        }
        const providerData = {
            ...req.body,
            isOpen,
            cuisineType: cuisineTypeArray,
            image: imageUrl,
        };
        const result = await providerServices.updateProvider(providerId, providerData);
        return res
            .status(200)
            .json({ data: result, message: "Provider updated successfully" });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
};
export const providerController = {
    updateProvider,
    getProviderOrders,
    getMyProviders,
    updateOrderStatus,
    getProviderMeals,
    createMeal,
    updateMeal,
    register,
    deleteMeal,
    getAllProviders,
};
