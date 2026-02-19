//import { mealsRoutes } from "./modules/meals/meals.routes";
import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import { providerRoutes } from "./modules/provider/provider.routes.js";
import { orderRoutes } from "./modules/orders/order.routes.js";
import { adminRoutes } from "./modules/admin/admin.routes.js";
import { reviewRoutes } from "./modules/reviews/reviews.routes.js";
import { categoryRoutes } from "./modules/category/category.routes.js";
import cors from "cors";
import { mealsRoutes } from "./modules/meals/meals.routes.js";
import { authRoutes } from "./modules/auth/auth.route.js";

const app = express();
const port = process.env.BACKEND_PORT;
console.log("Better Auth URL:", process.env.BETTER_AUTH_URL);
console.log("App URL:", process.env.APP_URL);
console.log("Database URL:", process.env.BACKEND_PORT);

// app.use(
//   cors({
//     origin: [`${process.env.APP_URL}`,`${process.env.APP_URL}/`],
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || origin.startsWith("http://localhost")) {
        return callback(null, true);
      }

      if (origin === process.env.APP_URL || origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

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
app.use("/auth",authRoutes)

app.listen(port, () => {
  console.log(`Better Auth app listening on port ${port}`);
});

export default app;