import { Router } from "express";
import customerController from "../controller/customer.controller";
import { verifyToken } from "../middleware/auth";
const route = Router();

route.post("/customerLogin", customerController.loginCustomer);
route.post("/customer", customerController.addCustomerController);
route.put(
  "/customer",
  verifyToken,
  customerController.updateCustomerController
);
route.get(
  "/customer/:id",
  verifyToken,
  customerController.getCustomerController
);
route.delete(
  "/customer/:id",
  verifyToken,
  customerController.deleteCustomerController
);
route.put(
  "/activateDeactivateCustomerAccount",
  customerController.activateDeactivateCustomerAccountController
);

export default route;
