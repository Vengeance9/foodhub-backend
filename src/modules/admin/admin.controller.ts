import { Request, Response } from "express";
import { adminServices } from "./admin.services";
import { UserRole } from "../../middleware/auth";
import { pagination } from "../../helpers/pagination";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    // console.log("Received query parameters:", req.query);
    const search = req.query.search;
    // console.log("Search query:", search);
    const searchString = typeof search === "string" ? search : undefined;
    const name = req.query.name as string;

    let role = req.query.role as string;
    role = (role?.toUpperCase() as keyof typeof UserRole) || undefined;
    const isActive = req.query.isActive
      ? req.query.isActive === "true"
        ? true
        : false
      : undefined;
    const { page, skip, limit } = pagination(req.query);

    // console.log("Query parameters:", { search: searchString, name, role, isActive, page, skip, limit });

    const result = await adminServices.getAllUsers({
      search: searchString,
      name,
      role,
      isActive,
      page,
      skip,
      limit,
    });
    // console.log(result)
    res
      .status(200)
      .json({ message: "Users fetched successfully", data: result });
  } catch (e: any) {
    console.log(e.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUserRole = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;
    const validRoles = Object.values(UserRole);

    if (!validRoles.includes(role)) {
      return res.status(400).json({
        message: `Invalid role. Valid roles are: ${validRoles.join(", ")}`,
      });
    }
    const Role: UserRole = role as UserRole;
    const result = await adminServices.updateUserRole(userId as string, role);
    res
      .status(200)
      .json({ message: "User role updated successfully", data: result });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    console.log("auiufdbfiuabsfiafnoafbaojfoafaofnoa");
    console.log("Received query parameters for orders:", req.query);
    const { page, skip, limit } = pagination(req.query);
    const result = await adminServices.getOrders({ page, skip, limit });
    console.log(result);
    res
      .status(200)
      .json({ message: "Orders fetched successfully", data: result });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { status } = req.body;
    const isActive = status === "true" ? true : false;
    const result = await adminServices.updateUserStatus(
      userId as string,
      isActive
    );
    res
      .status(200)
      .json({ message: "User status updated successfully", data: result });
  } catch (e: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: e.message });
  }
};

export const adminController = {
  getAllUsers,
  updateUserRole,
  getOrders,
  updateUserStatus,
};
