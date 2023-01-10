import { Request, Response } from "express";
import { client } from "../config/db.connection";
import adminServices from "../services/admin.services";
import { createToken } from "../middleware/auth";
import bcrypt from "bcrypt";
import customerServices from "../services/customer.services";
import { customerAddValidation } from "../middleware/customer.validation";

const loginAdmin = (req: Request, res: Response) => {
  /* 	#swagger.tags = ['Admin']
              #swagger.description = ' admin login enter admin email id and password' */

  /*	#swagger.parameters['obj'] = {
                    in: 'body',
                    description: 'login.',
                    required: true,
                    schema: { $ref: "#/definitions/loginAdmin" }
            } */
  let requestBody = req.body;

  if (!requestBody.email_id) {
    return res.status(422).json({ message: "please provide valid email id." });
  }

  if (!requestBody.password) {
    return res.status(422).json({ message: "please provide valid password." });
  }
  let result: any;
  client
    .query("BEGIN")
    .then(async () => {
      result = await adminServices.checkEMailExistOrNotService(
        requestBody.email_id
      );
      if (result.rowCount === 0) {
        return res.status(422).json({ message: "email id not exist." });
      } else {
        result = await adminServices.getAdminDetails(requestBody.email_id);
        let passwordMatch = await bcrypt.compare(
          requestBody.password,
          result.rows[0].password
        );

        if (passwordMatch) {
          let token = await createToken({ id: result.rows[0].id });

          delete result.rows[0].password;
          result.rows[0].token = token;
          return res
            .status(200)
            .json({ message: "login successfully.", data: result.rows[0] });
        } else {
          return res.status(422).json({ message: "Password Incorrect." });
        }
      }
    })
    .catch((err) => {
      client.query("rollback");
      return res.status(400).json({ message: err.message });
    })
    .catch((err) => {
      return res.status(400).json({ message: err.message });
    });
};

const adminAddCustomerController = async (req: Request, res: Response) => {
  try {
    /* 	#swagger.tags = ['Admin']
              #swagger.description = 'Only user can add type all Parameter are mandatory in swagger for testing purpose ' */

    /*	#swagger.parameters['obj'] = {
                    in: 'body',
                    description: 'add  details.',
                    required: true,
                    schema: { $ref: "#/definitions/adminAddCustomerController" }
            } */

    /* #swagger.security = [{
                    "apiKeyAuth": []
            }] */
    let requestBody = req.body;
    let validation = await customerAddValidation(requestBody);
    if (validation) {
      return res.status(422).json({ message: validation });
    }
    const salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(requestBody.password, salt);
    requestBody.password = hashPassword;
    requestBody.account_status = requestBody.account_status = true;

    let result: any = await customerServices.addCustomerServices(requestBody);

    if (result.rowCount <= 0) {
      return res.status(200).json({
        message: "Customer Details Not Added In Data Base.",
        status: false,
      });
    } else {
      let token = await createToken({ id: result.rows[0].id });
      return res.status(200).json({
        message: "Customer Details  Added Successfully.",
        status: true,
        Data: [{ id: result.rows[0].id }],
      });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export default {
  loginAdmin,
  adminAddCustomerController,
};
