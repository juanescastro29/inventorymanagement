import { api, getResponseData, escalateError } from "./index";

export default class SuppliersApi{
    static async getSuppliers(){
        return await api.get('suppliers/')
        .then(getResponseData)
        .catch(escalateError);
    }

    static async getSupplier(supplierId){
      return await api.get(`suppliers/${supplierId}`)
      .then(getResponseData)
      .catch(escalateError);
  }

    static async createSupplier(supplierData){
        return await api.post('suppliers/', supplierData)
        .then(getResponseData)
        .catch(escalateError);
    }

    static async updateSupplier(supplierData, supplierId){
        return await api.put(`supplier/${supplierId}`, supplierData)
        .then(getResponseData)
        .catch(escalateError);
    }

    static async deleteSupplier(supplierId){
        return await api.delete(`supplier/${supplierId}`)
        .then(getResponseData)
        .catch(escalateError);
    }
    
};