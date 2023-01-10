import { Router } from "express";
import adminRoutes from "../routes/admin.routes";
import customerRoutes from "../routes/customer.routes";
const routers = Router();

const defaultRoutes = [
  {
    path: "/",
    route: adminRoutes,
  },
  {
    path: "/",
    route: customerRoutes,
  },
];

defaultRoutes.forEach((route) => {
  routers.use(route.path, route.route);
});

export default routers;
