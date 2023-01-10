import { Request, Response } from "express";
import customerServices from "../services/customer.services";
import bcrypt from "bcrypt";
import { createToken } from "../middleware/auth";
import { client } from "../config/db.connection";
import { customerAddValidation } from "../middleware/customer.validation";

const loginCustomer = (req: Request, res: Response) => {
  /* 	#swagger.tags = ['Customer']
              #swagger.description = ' admin login enter admin email id and password' */

  /*	#swagger.parameters['obj'] = {
                    in: 'body',
                    description: 'login.',
                    required: true,
                    schema: { $ref: "#/definitions/loginCustomer" }
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
      result = await customerServices.checkEMailExistOrNotService(
        requestBody.email_id
      );
      if (result.rowCount === 0) {
        return res.status(422).json({ message: "email id not exist." });
      } else {
        result = await customerServices.getCustomerDetailsLogin(
          requestBody.email_id
        );
        if (result.rowCount === 0) {
          return res
            .status(403)
            .json({ message: "Account Is Deactivated By Admin." });
        }

        let passwordMatch = await bcrypt.compare(
          requestBody.password,
          result.rows[0].hash_password
        );

        if (passwordMatch) {
          let token = await createToken({ id: result.rows[0].id });

          delete result.rows[0].hash_password;
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

const addCustomerController = async (req: Request, res: Response) => {
  try {
    /* 	#swagger.tags = ['Customer']
              #swagger.description = 'Only user can add type all Parameter are mandatory in swagger for testing purpose
              if admin created the account then in actionById= admin id other wise zero ' */

    /*	#swagger.parameters['obj'] = {
                    in: 'body',
                    description: 'add  details.',
                    required: true,
                    schema: { $ref: "#/definitions/addCustomerController" }
            } */

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
        Data: [{ id: result.rows[0].id, token }],
      });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const updateCustomerController = async (req: Request, res: Response) => {
  try {
    /* 	#swagger.tags = ['Customer']
              #swagger.description = 'Only user can add type all Parameter are mandatory in swagger for testing purpose
             if admin updated account then in actionById= admin id other wise zero' */

    /*	#swagger.parameters['obj'] = {
                    in: 'body',
                    description: 'update  details.',
                    required: true,
                    schema: { $ref: "#/definitions/updateCustomerController" }
            } */

    /* #swagger.security = [{
                    "apiKeyAuth": []
            }] */
    let requestBody = req.body;
    let validation = await customerAddValidation(requestBody);
    if (validation) {
      return res.status(422).json({ message: validation });
    }
    let result: any = await customerServices.updateUserServices(requestBody);
    if (result.rowCount <= 0) {
      return res.status(200).json({
        message: "Customer Details Not Updated In Data Base.",
        status: false,
      });
    } else {
      return res.status(200).json({
        message: "Customer Details  Updated Successfully.",
        status: true,
      });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const getCustomerController = async (req: Request, res: Response) => {
  try {
    // #swagger.tags = ['Admin']
    //         // #swagger.description = 'put 0 for all customer list'
    /* #swagger.security = [{
                    "apiKeyAuth": []
            }] */

    if (!req.params.id) {
      req.params.id = "0";
    }

    let result: any = await customerServices.getCustomerServices(req.params.id);
    if (result.rowCount <= 0) {
      return res.status(200).json({ message: "No Data Found.", status: false });
    } else {
      return res.status(200).json({
        message: "Customer Details.",
        status: true,
        data: result.rows,
      });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteCustomerController = async (req: Request, res: Response) => {
  try {
    // #swagger.tags = ['Comman-Api']
    //         // #swagger.description = 'put id for delete the user'
    /* #swagger.security = [{
                    "apiKeyAuth": []
            }] */

    let result: any = await customerServices.deleteCustomerServices(
      req.params.id
    );
    if (result.rowCount <= 0) {
      return res
        .status(200)
        .json({ message: "Record Not Deleted.", status: false });
    } else {
      return res
        .status(200)
        .json({ message: "Customer Deleted Successfully.", status: true });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const activateDeactivateCustomerAccountController = async (
  req: Request,
  res: Response
) => {
  try {
    /* 	#swagger.tags = ['Admin']
              #swagger.description = 'Only user can add type all Parameter are mandatory in swagger for testing purpose
              for deactivate user account_status=false and for activate true' */

    /*	#swagger.parameters['obj'] = {
                    in: 'body',
                    description: 'admin activate or deactivate.',
                    required: true,
                    schema: { $ref: "#/definitions/activateDeactivateCustomerAccountController" }
            } */

    /* #swagger.security = [{
                    "apiKeyAuth": []
            }] */
    let requestBody = req.body;
    if (
      requestBody.account_status === undefined ||
      requestBody.account_status === ""
    ) {
      return res
        .status(422)
        .json({ message: "Please Enter Valid account Status" });
    }
    if (!requestBody.id) {
      return res
        .status(422)
        .json({ message: "Please Enter Valid Customer Id" });
    }
    let result: any =
      await customerServices.activateDeactivateCustomerAccountServices(
        requestBody
      );
    if (result.rowCount <= 0) {
      return res.status(200).json({ message: "No Data Found.", status: false });
    } else {
      if (requestBody.account_status === true) {
        return res
          .status(200)
          .json({ message: "Customer Activated Successfully." });
      } else {
        return res
          .status(200)
          .json({ message: "Customer Deactivated Successfully." });
      }
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export default {
  loginCustomer,
  addCustomerController,
  updateCustomerController,
  getCustomerController,
  deleteCustomerController,
  activateDeactivateCustomerAccountController,
};
