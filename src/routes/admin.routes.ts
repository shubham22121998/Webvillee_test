import { Router } from "express";
import adminController from "../controller/admin.controller";
import { verifyToken } from "../middleware/auth";
const route = Router();

route.post("/adminLogin", adminController.loginAdmin);
route.post(
  "/adminAddCustomer",
  verifyToken,
  adminController.adminAddCustomerController
);

export default route;
