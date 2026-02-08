import { getOrder } from "../../../node_modules/effect/src/Array";
import { Request, Response } from "express";
import { orderServices } from "./order.services";

type cartItem = {
  providerMealId: string;
  quantity: number;
};

type orderItems = {
  customerid: string;
  providerId: string;
  deliveryAddress: string;
  cartItems: cartItem[];
};

const addToCart = async (req: Request, res: Response) => {
  try{
    const providerMealId = req.params.providerMealId;
    const userId = req.user?.id;
    const { quantity } = req.body as cartItem;
    const result = await orderServices.addToCart(
      quantity,
      userId as string,
      providerMealId as string
    );
    res.status(200).json({ message: "Items added to cart successfully", data: result });

  }catch(e:any){
    res.status(500).json({ message: e.message });
    return;
  }
}

const getCart = async (req: Request, res: Response) => {
  try{
    const userId = req.user?.id;
    const result = await orderServices.getCart(
      userId as string
    );
    res.status(200).json({ message: "Cart fetched successfully", data: result });

  }catch(e){
    res.status(500).json({ message: "Internal server error" });
    return;
  }
}

const checkOutOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const providerId = req.params.providerId;
    const result = await orderServices.checkOutOrder(
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

export const orderController = { checkOutOrder, getOrders, getOrderDetails,addToCart,getCart };
