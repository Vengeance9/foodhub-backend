"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
router.get('/', category_controller_1.categoryController.getCategories);
router.get('/providers/:name', category_controller_1.categoryController.getCategoryProviders);
router.get('/providers/:name/:providerId/meals', category_controller_1.categoryController.getCategoryMeals);
exports.categoryRoutes = router;
