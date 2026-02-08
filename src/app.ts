import { mealsRoutes } from './modules/Meals/meals.routes';
import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { providerRoutes } from "./modules/provider/provider.routes";
import { orderRoutes } from './modules/orders/order.routes';
import { adminRoutes } from './modules/admin/admin.routes';
import { reviewRoutes } from './modules/reviews/reviews.routes';

const app = express();
const port = 3000;

app.all("/api/auth/*splat", toNodeHandler(auth));

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());
app.use('/provider',providerRoutes)
app.use('/meals',mealsRoutes)
app.use('/orders',orderRoutes)
app.use('/admin',adminRoutes)
app.use('/reviews',reviewRoutes)

app.listen(port, () => {
  console.log(`Better Auth app listening on port ${port}`);
});
