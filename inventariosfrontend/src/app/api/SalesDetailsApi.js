import { api, getResponseData, escalateError } from "./index";

export default class SalesDetailsApi{
    static async getSalesDetails(){
        return await api.get('salesDetails/')
        .then(getResponseData)
        .catch(escalateError);
    }

    static async getSaleDetail(salesId){
      return await api.get(`salesDetails/${salesId}`)
      .then(getResponseData)
      .catch(escalateError);
  }

    static async createSaleDetail(salesData){
        return await api.post('salesDetails/', salesData)
        .then(getResponseData)
        .catch(escalateError);
    }

    static async updateSalesDetail(salesData, saleId){
        return await api.put(`salesDetails/`, salesData)
        .then(getResponseData)
        .catch(escalateError);
    }

    static async deleteSalesDetail(salesId){
        return await api.delete(`salesDetails/${salesId}`)
        .then(getResponseData)
        .catch(escalateError);
    }
    
};