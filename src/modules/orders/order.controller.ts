import { getOrder } from "../../../node_modules/effect/src/Array";
import { Request, Response } from "express";
import { orderServices } from "./order.services";

type cartItem = {
  providerMealId: string;
  quantity: number;
  price: number;
};

type orderItems = {
  customerid: string;
  providerId: string;
  deliveryAddress: string;
  cartItems: cartItem[];
};

const createOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const providerId = req.params.providerId;
    const result = await orderServices.createOrders(
      req.body,
      userId as string,
      providerId as string
    );
    res
      .status(201)
      .json({ message: "Order created successfully", data: result });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const result = await orderServices.getOrders(userId as string);
    res
      .status(200)
      .json({ message: "Orders fetched successfully", data: result });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrderDetails = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;
    const userId = req.user?.id;
    const result = await orderServices.getOrderDetails(
      orderId as string,
      userId as string
    );
    res
      .status(200)
      .json({ message: "Order details fetched successfully", data: result });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const orderController = { createOrders, getOrders, getOrderDetails };
