"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_services_1 = require("./order.services");
const addToCart = async (req, res) => {
    try {
        const providerMealId = req.params.providerMealId;
        const userId = req.user?.id;
        console.log("THIS IS THE PROVIDER MEAL ID", providerMealId);
        console.log("THIS IS THE USER ID", userId);
        const { quantity } = req.body;
        const result = await order_services_1.orderServices.addToCart(quantity, userId, providerMealId);
        if (typeof result === "string") {
            // result is of type "Meal not found"
            console.log("THIS IS THE RESULT", result);
            res.status(200).json({ message: result });
        }
        else {
            // result is an object with a message property
            res.status(200).json({ message: result.message, data: result.cartItem });
        }
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
        return;
    }
};
const clearCart = async (req, res) => {
    try {
        const userId = req.user?.id;
        console.log("THIS IS THE USER ID", userId);
        const response = await order_services_1.orderServices.clearCart(userId);
        console.log(response.message);
        res.status(200).json({ message: response.message });
    }
    catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};
const getCart = async (req, res) => {
    try {
        const userId = req.user?.id;
        const result = await order_services_1.orderServices.getCart(userId);
        if (result.cart == null) {
            res.status(200).json({ message: "Cart is empty", data: null });
            return;
        }
        res.status(200).json({ message: "Cart fetched successfully", data: result });
    }
    catch (e) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};
const checkOutOrder = async (req, res) => {
    try {
        const userId = req.user?.id;
        const result = await order_services_1.orderServices.checkOutOrder(req.body, userId);
        if (typeof result === "string") {
            res.status(200).json({ message: result });
            return;
        }
        res.status(201).json({ message: "Order created successfully", data: result });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
const getOrders = async (req, res) => {
    try {
        const userId = req.user?.id;
        const result = await order_services_1.orderServices.getOrders(userId);
        res
            .status(200)
            .json({ message: "Orders fetched successfully", data: result });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
const getOrderDetails = async (req, res) => {
    try {
        const orderId = req.params.id;
        const userId = req.user?.id;
        const result = await order_services_1.orderServices.getOrderDetails(orderId, userId);
        res
            .status(200)
            .json({ message: "Order details fetched successfully", data: result });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.orderController = { checkOutOrder, getOrders, getOrderDetails, addToCart, getCart, clearCart };
