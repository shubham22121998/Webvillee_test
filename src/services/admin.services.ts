import { client } from "../config/db.connection";
import { adminQuery } from "../utility/admin.query";

class AdminServices {
  constructor() {}

  async checkEMailExistOrNotService(email_id: string) {
    let query: any = {
      text: adminQuery.checkEmailExistOrNot(),
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

  async getAdminDetails(email_id: string) {
    let query: any = {
      text: adminQuery.getAdminDetails(),
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
}

export default new AdminServices();
