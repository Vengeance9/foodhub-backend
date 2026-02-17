import { mealsRoutes } from "./modules/meals/meals.routes";
import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { providerRoutes } from "./modules/provider/provider.routes";
import { orderRoutes } from "./modules/orders/order.routes";
import { adminRoutes } from "./modules/admin/admin.routes";
import { reviewRoutes } from "./modules/reviews/reviews.routes";
import { categoryRoutes } from "./modules/category/category.routes";
import cors from "cors";
const app = express();
const port = process.env.BACKEND_PORT;
console.log("Better Auth URL:", process.env.BETTER_AUTH_URL);
console.log("App URL:", process.env.APP_URL);
console.log("Database URL:", process.env.BACKEND_PORT);
app.use(cors({
    origin: `${process.env.APP_URL}`,
    credentials: true,
}));
app.all("/api/auth/*splat", toNodeHandler(auth));
// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());
app.use("/provider", providerRoutes);
app.use("/meal", mealsRoutes);
app.use("/order", orderRoutes);
app.use("/admin", adminRoutes);
app.use("/review", reviewRoutes);
app.use("/categories", categoryRoutes);
app.listen(port, () => {
    console.log(`Better Auth app listening on port ${port}`);
});
