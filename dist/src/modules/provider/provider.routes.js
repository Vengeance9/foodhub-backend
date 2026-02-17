"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerRoutes = void 0;
const auth_1 = __importStar(require("../../middleware/auth"));
const express_1 = __importDefault(require("express"));
const provider_controller_1 = require("./provider.controller");
const upload_1 = __importDefault(require("../../middleware/upload"));
const router = express_1.default.Router();
router.post("/register", (0, auth_1.default)(auth_1.UserRole.CUSTOMER, auth_1.UserRole.PROVIDER), upload_1.default.single("image"), provider_controller_1.providerController.register);
router.put("/update_provider/:id", (0, auth_1.default)(auth_1.UserRole.PROVIDER), upload_1.default.single("image"), provider_controller_1.providerController.updateProvider);
router.get("/my_providers", (0, auth_1.default)(auth_1.UserRole.PROVIDER), provider_controller_1.providerController.getMyProviders);
router.get("/AllProviders", provider_controller_1.providerController.getAllProviders);
router.get("/providerMeals/:id", (0, auth_1.default)(auth_1.UserRole.PROVIDER), provider_controller_1.providerController.getProviderMeals);
router.post("/meals/:id", (0, auth_1.default)(auth_1.UserRole.PROVIDER), upload_1.default.single("image"), provider_controller_1.providerController.createMeal);
router.put("/meals/:id", (0, auth_1.default)(auth_1.UserRole.PROVIDER), upload_1.default.single("image"), provider_controller_1.providerController.updateMeal);
router.delete("/meals/:id", (0, auth_1.default)(auth_1.UserRole.PROVIDER), provider_controller_1.providerController.deleteMeal);
router.put("/updateOrderStatus/:id", (0, auth_1.default)(auth_1.UserRole.PROVIDER), provider_controller_1.providerController.updateOrderStatus);
router.get("/provider_orders/:providerId", (0, auth_1.default)(auth_1.UserRole.PROVIDER), provider_controller_1.providerController.getProviderOrders);
exports.providerRoutes = router;
