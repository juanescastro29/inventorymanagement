import { api, getResponseData, escalateError } from "./index";

export default class PurchasesApi {
  static async getPurchases() {
    return await api
      .get("purchases/")
      .then(getResponseData)
      .catch(escalateError);
  }

  static async getPurchase(purchaseId) {
    return await api
      .get(`purchases/${purchaseId}`)
      .then(getResponseData)
      .catch(escalateError);
  }

  static async createPurchase(purchaseData) {
    return await api
      .post("purchases/", purchaseData)
      .then(getResponseData)
      .catch(escalateError);
  }

  static async updatePurchase(purchaseData, purchaseId) {
    return await api
      .put(`purchases/${purchaseId}`, purchaseData)
      .then(getResponseData)
      .catch(escalateError);
  }

  static async deletePurchase(purchaseId) {
    return await api
      .delete(`purchases/${purchaseId}`)
      .then(getResponseData)
      .catch(escalateError);
  }
}
