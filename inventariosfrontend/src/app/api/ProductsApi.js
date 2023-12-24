import { api, getResponseData, escalateError } from "./index";

export default class ProductsApi{
    static async getProducts(){
        return await api.get('products/')
        .then(getResponseData)
        .catch(escalateError);
    }

    static async getProduct(productId){
      return await api.get(`products/${productId}`)
      .then(getResponseData)
      .catch(escalateError);
  }

    static async createProduct(productData){
        return await api.post('products/', productData)
        .then(getResponseData)
        .catch(escalateError);
    }

    static async updateProduct(productData, productId){
        return await api.put(`products/${productId}`, productData)
        .then(getResponseData)
        .catch(escalateError);
    }

    static async deleteProduct(productId){
        return await api.delete(`products/${productId}`)
        .then(getResponseData)
        .catch(escalateError);
    }
    
};