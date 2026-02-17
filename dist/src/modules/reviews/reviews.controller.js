"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewController = void 0;
const reviews_services_1 = require("./reviews.services");
const reviewProvider = async (req, res) => {
    try {
        const userId = req.user?.id;
        const providerId = req.params.providerId;
        const { rating, comment } = req.body;
        // console.log("userId:", userId);
        // console.log("providerId:", providerId);
        // console.log('This is the rating',rating)
        // console.log('This is the comment',comment)
        const result = await reviews_services_1.reviewServices.reviewProvider(userId, providerId, rating, comment);
        // console.log(result)
        return res.status(201).json({ data: result, message: result.message });
    }
    catch (e) {
        console.log(e.message);
        return res.status(500).json({ message: e.message });
    }
};
const getMyReviews = async (req, res) => {
    const userId = req.user?.id;
    const providerId = req.params.providerId;
    try {
        const result = await reviews_services_1.reviewServices.getMyReviews(userId, providerId);
        return res.status(200).json({ data: result });
    }
    catch (e) {
        console.log(e.message);
        return res.status(500).json({ message: e.message });
    }
};
const getAllReviews = async (req, res) => {
    const providerId = req.params.providerId;
    try {
        const result = await reviews_services_1.reviewServices.getAllReviews(providerId);
        // console.log(result)
        return res.status(200).json({ data: result });
    }
    catch (e) {
        console.log(e.message);
        return res.status(500).json({ message: e.message });
    }
};
exports.reviewController = { reviewProvider, getMyReviews, getAllReviews };
