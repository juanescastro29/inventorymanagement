import { api, getResponseData, escalateError } from "./index";

export default class CustomerApi{
    static async getCustomers(){
        return await api.get('customers/')
        .then(getResponseData)
        .catch(escalateError);
    }

    static async getCustomer(customerId){
      return await api.get(`customers/${customerId}`)
      .then(getResponseData)
      .catch(escalateError);
  }

    static async createCustomer(customerData){
        return await api.post('customers/', customerData)
        .then(getResponseData)
        .catch(escalateError);
    }

    static async updateCustomer(customerData, id){
        return await api.put(`customers/${id}`, customerData)
        .then(getResponseData)
        .catch(escalateError);
    }

    static async deleteCustomer(customerId){
        return await api.delete(`customers/${customerId}`)
        .then(getResponseData)
        .catch(escalateError);
    }
    
};