import { api, getResponseData, escalateError } from "./index";

export default class SalesApi{
    static async getSales(){
        return await api.get('sales/')
        .then(getResponseData)
        .catch(escalateError);
    }

    static async getSale(salesId){
      return await api.get(`sales/${salesId}`)
      .then(getResponseData)
      .catch(escalateError);
  }

    static async createSale(salesData){
        return await api.post('sales/', salesData)
        .then(getResponseData)
        .catch(escalateError);
    }

    static async updateSales(salesData, saleId){
        return await api.put(`sales/${saleId}`, salesData)
        .then(getResponseData)
        .catch(escalateError);
    }

    static async deleteSales(salesId){
        return await api.delete(`sales/${salesId}`)
        .then(getResponseData)
        .catch(escalateError);
    }
    
};