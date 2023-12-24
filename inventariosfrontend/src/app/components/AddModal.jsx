"use client";

import { Modal } from "keep-react";
import { useForm } from "react-hook-form";
import { PlusCircle } from "phosphor-react";
import CustomerApi from "../api/CustomersApi";
import toast from "react-hot-toast";
import { mutate } from "swr";
import { apiURL } from "../api";
import SuppliersApi from "../api/SuppliersApi";
import ProductsApi from "../api/ProductsApi";
import PurchasesDetailsApi from "../api/PurchasesDetailsApi";
import { useEffect, useState } from "react";
import PurchasesApi from "../api/PurchasesApi";
import SalesApi from "../api/SalesApi";
import SalesDetailsApi from "../api/SalesDetailsApi";

const AddModal = ({ addModal, viewAddModal, type }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  async function addElement(dataForm) {
    if (type === "customers") {
      toast.promise(CustomerApi.createCustomer(dataForm), {
        loading: "Agregando comprador",
        success: () => {
          viewAddModal();
          mutate(apiURL);
          reset();
          return "Comprador agregado";
        },
        error: "Error al agregar comprador",
      });
    } else if (type === "suppliers") {
      toast.promise(SuppliersApi.createSupplier(dataForm), {
        loading: "Agregando proveedor",
        success: () => {
          viewAddModal();
          mutate(apiURL);
          reset();
          return "Proveedor agregado";
        },
        error: "Error al agregar proveedor",
      });
    } else if (type === "products") {
      toast.promise(ProductsApi.createProduct(dataForm), {
        loading: "Agregando producto",
        success: () => {
          viewAddModal();
          mutate(apiURL);
          reset();
          return "Producto agregado";
        },
        error: "Error al agregar el producto",
      });
    } else if (type === "purchases") {
      const response = await PurchasesApi.createPurchase(dataForm);
      dataForm.purchase_id = response.purchase_id;
      toast.promise(PurchasesDetailsApi.createPurchaseDetail(dataForm), {
        loading: "Agregando pedido",
        success: () => {
          viewAddModal();
          mutate(apiURL);
          reset();
          return "Pedido agredado";
        },
        error: "Error al agregar el pedido",
      });
    } else if (type === "sales") {
      const response = await SalesApi.createSale(dataForm);
      dataForm.sale_id = response.sale_id;
      console.log(dataForm);
      toast.promise(SalesDetailsApi.createSaleDetail(dataForm), {
        loading: "Agregando compra",
        success: () => {
          viewAddModal();
          mutate(apiURL);
          reset();
          return "Compra agregada"
        },
        error: "Error al agregar la compra"
      })
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (type === "purchases") {
        const response = await SuppliersApi.getSuppliers();
        const data = await ProductsApi.getProducts();
        setSuppliers(response);
        setProducts(data);
      } else if (type === "sales") {
        const response = await CustomerApi.getCustomers();
        const data = await ProductsApi.getProducts();
        setCustomers(response);
        setProducts(data);
      } 
    }
    fetchData();
  }, []);

  return (
    <Modal
      icon={<PlusCircle size={26} color="#3b82f6" />}
      size="xl"
      show={addModal}
      onClose={() => {
        viewAddModal();
        reset();
      }}
    >
      <Modal.Header>
        {type === "customers" && <>Agregar comprador</>}
        {type === "suppliers" && <>Agregar proveedor</>}
        {type === "products" && <>Agregar productos</>}
        {type === "purchases" && <>Agregar pedidos</>}
        {type === "sales" && <>Agregar ventas</>}
      </Modal.Header>
      <Modal.Body>
        <form
          className="grid grid-cols-4 gap-2 p-5 w-full text-sm"
          onSubmit={handleSubmit(addElement)}
        >
          {(type === "customers" || type === "suppliers") && (
            <>
              <div className="col-span-2 w-full">
                <label className="block text-sm font-medium leading-8">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                  placeholder="Nombre"
                  {...register("name", {
                    required: true,
                    pattern: /^[A-Za-z ]+$/,
                  })}
                />
                {errors.name?.type === "required" && (
                  <div className="text-red-600 text-center">
                    <small>Este campo es requerido.</small>
                  </div>
                )}
                {errors.name?.type === "pattern" && (
                  <div className="text-red-600 text-center">
                    <small>Solo se permiten letras.</small>
                  </div>
                )}
              </div>
              <div className="col-span-2 w-full">
                <label className="block text-sm font-medium leading-8">
                  Dirección
                </label>
                <input
                  type="text"
                  name="address"
                  className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                  placeholder="Dirección"
                  {...register("address", {
                    required: true,
                  })}
                />
                {errors.address?.type === "required" && (
                  <div className="text-red-600 text-center">
                    <small>Este campo es requerido.</small>
                  </div>
                )}
              </div>
              <div className="col-span-2 w-full">
                <label className="block text-sm font-medium leading-8">
                  Teléfono
                </label>
                <input
                  type="text"
                  name="phone"
                  className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                  placeholder="Teléfono"
                  {...register("phone", {
                    required: true,
                    pattern: /^[0-9]+$/,
                  })}
                />
                {errors.phone?.type === "required" && (
                  <div className="text-red-600 text-center">
                    <small>Este campo es requerido.</small>
                  </div>
                )}
                {errors.phone?.type === "pattern" && (
                  <div className="text-red-600 text-center">
                    <small>Número no valido.</small>
                  </div>
                )}
              </div>
              <div className="col-span-2 w-full">
                <label className="block text-sm font-medium leading-8">
                  Correo electrónico
                </label>
                <input
                  type="text"
                  name="email"
                  className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                  placeholder="correo electrónico"
                  {...register("email", {
                    required: true,
                    pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  })}
                />
                {errors.email?.type === "required" && (
                  <div className="text-red-600 text-center">
                    <small>Este campo es requerido.</small>
                  </div>
                )}
                {errors.email?.type === "pattern" && (
                  <div className="text-red-600 text-center">
                    <small>Correo electrónico no valido.</small>
                  </div>
                )}
              </div>
            </>
          )}
          {type === "products" && (
            <>
              <div className="col-span-2 w-full">
                <label className="block text-sm font-medium leading-8">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                  placeholder="Nombre"
                  {...register("name", {
                    required: true,
                  })}
                />
                {errors.name?.type === "required" && (
                  <div className="text-red-600 text-center">
                    <small>Este campo es requerido.</small>
                  </div>
                )}
              </div>
              <div className="col-span-2 w-full">
                <label className="block text-sm font-medium leading-8">
                  Precio de pedido
                </label>
                <input
                  type="text"
                  name="purchasePrice"
                  className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                  placeholder="Precio de pedido"
                  {...register("purchasePrice", {
                    required: true,
                    pattern: /^[0-9]+$/,
                  })}
                />
                {errors.purchasePrice?.type === "required" && (
                  <div className="text-red-600 text-center">
                    <small>Este campo es requerido.</small>
                  </div>
                )}
                {errors.purchasePrice?.type === "pattern" && (
                  <div className="text-red-600 text-center">
                    <small>Precio no valido.</small>
                  </div>
                )}
              </div>
              <div className="col-span-2 w-full">
                <label className="block text-sm font-medium leading-8">
                  Stock
                </label>
                <input
                  type="text"
                  name="stock"
                  className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                  placeholder="Stock"
                  {...register("stock", {
                    required: true,
                    pattern: /^[0-9]+$/,
                    min: 1,
                  })}
                />
                {errors.stock?.type === "required" && (
                  <div className="text-red-600 text-center">
                    <small>Este campo es requerido.</small>
                  </div>
                )}
                {errors.stock?.type === "pattern" && (
                  <div className="text-red-600 text-center">
                    <small>Stock no valido.</small>
                  </div>
                )}
                {errors.stock?.type === "min" && (
                  <div className="text-red-600 text-center">
                    <small>La cantidad debe ser mayor que 0.</small>
                  </div>
                )}
              </div>
              <div className="col-span-2 w-full">
                <label className="block text-sm font-medium leading-8">
                  Precio de venta
                </label>
                <input
                  type="text"
                  name="salePrice"
                  className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                  placeholder="Precio de venta"
                  {...register("salePrice", {
                    required: true,
                    pattern: /^[0-9]+$/,
                  })}
                />
                {errors.salePrice?.type === "required" && (
                  <div className="text-red-600 text-center">
                    <small>Este campo es requerido.</small>
                  </div>
                )}
                {errors.salePrice?.type === "pattern" && (
                  <div className="text-red-600 text-center">
                    <small>Precio no valido.</small>
                  </div>
                )}
              </div>
              <div className="col-span-4 w-full">
                <label className="block text-sm font-medium leading-8">
                  Descripcion
                </label>
                <textarea
                  type="text"
                  name="description"
                  className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 h-20"
                  placeholder="Descripción"
                  {...register("description", {
                    required: true,
                  })}
                  style={{ resize: "none" }}
                />
                {errors.description?.type === "required" && (
                  <div className="text-red-600 text-center">
                    <small>Este campo es requerido.</small>
                  </div>
                )}
              </div>
            </>
          )}
          {type === "purchases" && (
            <>
              <div className="col-span-2 w-full">
                <label className="block text-sm font-medium leading-8">
                  Proveedor
                </label>
                <select
                  className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                  name="supplier_id"
                  {...register("supplier_id", {
                    required: true,
                  })}
                >
                  <option value="">Seleccione el proveedor</option>
                  {suppliers?.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
                {errors.supplier_id?.type === "required" && (
                  <div className="text-red-600 text-center">
                    <small>Este campo es requerido.</small>
                  </div>
                )}
              </div>
              <div className="col-span-2 w-full">
                <label className="block text-sm font-medium leading-8">
                  Fecha
                </label>
                <input
                  type="date"
                  name="date"
                  className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                  placeholder="Fecha"
                  {...register("date", {
                    required: true,
                  })}
                />
                {errors.date?.type === "required" && (
                  <div className="text-red-600 text-center">
                    <small>Este campo es requerido.</small>
                  </div>
                )}
              </div>
              <div className="col-span-2 w-full">
                <label className="block text-sm font-medium leading-8">
                  Producto
                </label>
                <select
                  className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                  name="product_id"
                  {...register("product_id", {
                    required: true,
                  })}
                >
                  <option value="">Seleccione el producto</option>
                  {products?.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
                {errors.product_id?.type === "required" && (
                  <div className="text-red-600 text-center">
                    <small>Este campo es requerido.</small>
                  </div>
                )}
              </div>
              <div className="col-span-2 w-full">
                <label className="block text-sm font-medium leading-8">
                  Cantidad
                </label>
                <input
                  type="text"
                  name="quantity"
                  className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                  placeholder="Cantidad"
                  {...register("quantity", {
                    required: true,
                    pattern: /^[0-9]+$/,
                    min: 1,
                  })}
                />
                {errors.quantity?.type === "required" && (
                  <div className="text-red-600 text-center">
                    <small>Este campo es requerido.</small>
                  </div>
                )}
                {errors.quantity?.type === "pattern" && (
                  <div className="text-red-600 text-center">
                    <small>Cantidad no valida.</small>
                  </div>
                )}
                {errors.quantity?.type === "min" && (
                  <div className="text-red-600 text-center">
                    <small>La cantidad debe ser mayor que 0.</small>
                  </div>
                )}
              </div>
              <div className="col-span-4 w-full">
                <label className="block text-sm font-medium leading-8">
                  Descripcion
                </label>
                <textarea
                  type="text"
                  name="description"
                  className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 h-20"
                  placeholder="Descripción"
                  {...register("description", {
                    required: true,
                  })}
                  style={{ resize: "none" }}
                />
                {errors.description?.type === "required" && (
                  <div className="text-red-600 text-center">
                    <small>Este campo es requerido.</small>
                  </div>
                )}
              </div>
            </>
          )}
          {type === "sales" && (
            <>
              <div className="col-span-2 w-full">
                <label className="block text-sm font-medium leading-8">
                  Comprador
                </label>
                <select
                  className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                  name="customer_id"
                  {...register("customer_id", {
                    required: true,
                  })}
                >
                  <option value="">Seleccione el comprador</option>
                  {customers?.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
                {errors.customer_id?.type === "required" && (
                  <div className="text-red-600 text-center">
                    <small>Este campo es requerido.</small>
                  </div>
                )}
              </div>
              <div className="col-span-2 w-full">
                <label className="block text-sm font-medium leading-8">
                  Fecha
                </label>
                <input
                  type="date"
                  name="date"
                  className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                  placeholder="Fecha"
                  {...register("date", {
                    required: true,
                  })}
                />
                {errors.date?.type === "required" && (
                  <div className="text-red-600 text-center">
                    <small>Este campo es requerido.</small>
                  </div>
                )}
              </div>
              <div className="col-span-2 w-full">
                <label className="block text-sm font-medium leading-8">
                  Producto
                </label>
                <select
                  className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                  name="product_id"
                  {...register("product_id", {
                    required: true,
                  })}
                >
                  <option value="">Seleccione el producto</option>
                  {products?.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
                {errors.product_id?.type === "required" && (
                  <div className="text-red-600 text-center">
                    <small>Este campo es requerido.</small>
                  </div>
                )}
              </div>
              <div className="col-span-2 w-full">
                <label className="block text-sm font-medium leading-8">
                  Cantidad
                </label>
                <input
                  type="text"
                  name="quantity"
                  className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                  placeholder="Cantidad"
                  {...register("quantity", {
                    required: true,
                    pattern: /^[0-9]+$/,
                    min: 1,
                  })}
                />
                {errors.quantity?.type === "required" && (
                  <div className="text-red-600 text-center">
                    <small>Este campo es requerido.</small>
                  </div>
                )}
                {errors.quantity?.type === "pattern" && (
                  <div className="text-red-600 text-center">
                    <small>Cantidad no valida.</small>
                  </div>
                )}
                {errors.quantity?.type === "min" && (
                  <div className="text-red-600 text-center">
                    <small>La cantidad debe ser mayor que 0.</small>
                  </div>
                )}
              </div>
              <div className="col-span-4 w-full">
                <label className="block text-sm font-medium leading-8">
                  Descripcion
                </label>
                <textarea
                  type="text"
                  name="description"
                  className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 h-20"
                  placeholder="Descripción"
                  {...register("description", {
                    required: true,
                  })}
                  style={{ resize: "none" }}
                />
                {errors.description?.type === "required" && (
                  <div className="text-red-600 text-center">
                    <small>Este campo es requerido.</small>
                  </div>
                )}
              </div>
            </>
          )}
          <div className="flex items-end justify-center gap-2 col-span-4 mt-4">
            <button
              className="bg-blue-500 rounded-md shadow-lg text-white h-10 w-28"
              type="button"
              onClick={() => {
                viewAddModal();
                reset();
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 rounded-md shadow-lg text-white h-10 w-28"
            >
              Guardar
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
