import { client } from "../config/db.connection";
import customerQuery from "../utility/customer.query";

class CustomerServices {
  constructor() {}

  async checkEMailExistOrNotService(email_id: string) {
    let query: any = {
      text: customerQuery.checkEmailExistNot(),
      values: [email_id.toLowerCase().trim()],
    };
    return new Promise(async (resolve, reject) => {
      try {
        const result = await client.query(query);

        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  async getCustomerDetailsLogin(email_id: string) {
    let query: any = {
      text: customerQuery.getCustomerDetailsLogin(),
      values: [email_id.toLowerCase().trim()],
    };
    return new Promise(async (resolve, reject) => {
      try {
        const result = await client.query(query);

        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  async addCustomerServices(customerDetails: any) {
    let query: any = {
      text: customerQuery.insertCustomer(),
      values: [
        customerDetails.full_name,
        customerDetails.email_id,
        customerDetails.profile_picture,
        customerDetails.password,
        customerDetails.account_status,
        new Date(),
        customerDetails.phone_number,
        customerDetails.actionByUserId,
      ],
    };
    return new Promise(async (resolve, reject) => {
      try {
        let result = await client.query(query);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
  async updateUserServices(customerDetails: any) {
    let query: any = {
      text: customerQuery.updateCustomer(),
      values: [
        customerDetails.full_name,
        customerDetails.phone_number,
        customerDetails.profile_picture,
        new Date(),
        customerDetails.actionByUserId,
        customerDetails.id,
      ],
    };
    return new Promise(async (resolve, reject) => {
      try {
        let result = await client.query(query);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
  async getCustomerServices(customerDetails: string) {
    let query: any = {
      text: customerQuery.getCustomer(),
      values: [customerDetails],
    };

    return new Promise(async (resolve, reject) => {
      try {
        let result = await client.query(query);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
  async deleteCustomerServices(customerDetails: string) {
    let query: any = {
      text: customerQuery.deleteAccount(),
      values: [customerDetails],
    };
    return new Promise(async (resolve, reject) => {
      try {
        let result = await client.query(query);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  async activateDeactivateCustomerAccountServices(customerDetails: any) {
    let query: any = {
      text: customerQuery.activateDeactivateCustomerAccount(),
      values: [customerDetails.account_status, new Date(), customerDetails.id],
    };
    return new Promise(async (resolve, reject) => {
      try {
        let result = await client.query(query);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new CustomerServices();
