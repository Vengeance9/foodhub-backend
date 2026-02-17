"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const meals_routes_1 = require("./modules/Meals/meals.routes");
const express_1 = __importDefault(require("express"));
const node_1 = require("better-auth/node");
const auth_1 = require("./lib/auth");
const provider_routes_1 = require("./modules/provider/provider.routes");
const order_routes_1 = require("./modules/orders/order.routes");
const admin_routes_1 = require("./modules/admin/admin.routes");
const reviews_routes_1 = require("./modules/reviews/reviews.routes");
const category_routes_1 = require("./modules/category/category.routes");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.BACKEND_PORT;
console.log("Better Auth URL:", process.env.BETTER_AUTH_URL);
console.log("App URL:", process.env.APP_URL);
console.log("Database URL:", process.env.BACKEND_PORT);
app.use((0, cors_1.default)({
    origin: `${process.env.APP_URL}`,
    credentials: true,
}));
app.all("/api/auth/*splat", (0, node_1.toNodeHandler)(auth_1.auth));
// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express_1.default.json());
app.use('/provider', provider_routes_1.providerRoutes);
app.use('/meal', meals_routes_1.mealsRoutes);
app.use('/order', order_routes_1.orderRoutes);
app.use('/admin', admin_routes_1.adminRoutes);
app.use('/review', reviews_routes_1.reviewRoutes);
app.use('/categories', category_routes_1.categoryRoutes);
app.listen(port, () => {
    console.log(`Better Auth app listening on port ${port}`);
});
