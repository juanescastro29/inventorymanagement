import { api, getResponseData, escalateError } from "./index";

export default class PurchasesDetailsApi {
  static async getPurchasesDetails() {
    return await api
      .get("purchasesDetails/")
      .then(getResponseData)
      .catch(escalateError);
  }

  static async getPurchaseDetail(purchaseDetailId) {
    return await api
      .get(`purchasesDetails/${purchaseDetailId}`)
      .then(getResponseData)
      .catch(escalateError);
  }

  static async createPurchaseDetail(purchaseDetailData) {
    return await api
      .post("purchasesDetails/", purchaseDetailData)
      .then(getResponseData)
      .catch(escalateError);
  }

  static async updatePurchaseDetail(purchaseDetailData, purchaseDetailId) {
    return await api
      .put(`purchasesDetails/`, purchaseDetailData)
      .then(getResponseData)
      .catch(escalateError);
  }

  static async deletePurchaseDetail(purchaseDetail) {
    return await api
      .delete(`purchasesDetails/${purchaseDetail}`)
      .then(getResponseData)
      .catch(escalateError);
  }
}
