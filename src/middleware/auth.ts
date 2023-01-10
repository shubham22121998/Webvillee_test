import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
let secrete =
  process.env.jwt_secrete || "sdshdsjdjasdjkhskdhkgdkhdhjksdhjkahdkhas";
const createToken = (data: any) => {
  return new Promise((resolve, reject) => {
    try {
      let token = jwt.sign({ id: data.id }, secrete, { expiresIn: "1d" });
      resolve(token);
    } catch (error) {
      reject(error);
    }
  });
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  return new Promise((resolve, reject) => {
    try {
      let { authorization } = req.headers;

      if (authorization) {
        let token: any = authorization;
        let result = jwt.verify(token, secrete);
        if (result) {
          next();
        } else {
          return res.status(403).json({ message: "Token is Not Valid." });
        }
      } else {
        return res.status(403).json({ message: "Please Provide Token." });
      }
    } catch (error: any) {
      reject(error.message);
    }
  });
};

export { createToken, verifyToken };
