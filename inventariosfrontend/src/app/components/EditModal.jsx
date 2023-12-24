import { Modal } from "keep-react";
import { useForm } from "react-hook-form";
import { PencilCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import CustomerApi from "../api/CustomersApi";
import toast from "react-hot-toast";
import { mutate } from "swr";
import { apiURL } from "../api";
import SuppliersApi from "../api/SuppliersApi";
import ProductsApi from "../api/ProductsApi";
import PurchasesDetailsApi from "../api/PurchasesDetailsApi";
import PurchasesApi from "../api/PurchasesApi";
import SalesApi from "../api/SalesApi";
import SalesDetailsApi from "../api/SalesDetailsApi";

export const EditModal = ({ editModal, viewEditModal, type, idEdit }) => {
  const [data, setData] = useState({});
  const [suppliers, setSuppliers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues: data });

  useEffect(() => {
    async function fetchData() {
      if (idEdit) {
        if (type === "customers") {
          const response = await CustomerApi.getCustomer(idEdit);
          setData(response);
        } else if (type === "suppliers") {
          const response = await SuppliersApi.getSupplier(idEdit);
          setData(response);
        } else if (type === "products") {
          const response = await ProductsApi.getProduct(idEdit);
          setData(response);
        } else if (type === "purchases") {
          const response = await PurchasesDetailsApi.getPurchaseDetail(idEdit);
          const responseSuppliers = await SuppliersApi.getSuppliers();
          const responseProducts = await ProductsApi.getProducts();
          setData(response);
          setSuppliers(responseSuppliers);
          setProducts(responseProducts);
        } else if (type === "sales") {
          const response = await SalesDetailsApi.getSaleDetail(idEdit);
          const responseCustomers = await CustomerApi.getCustomers();
          const responseProducts = await ProductsApi.getProducts();
          setData(response);
          setCustomers(responseCustomers);
          setProducts(responseProducts);
        }
      }
    }
    fetchData();
  }, [idEdit]);

  useEffect(() => {
    reset(data);
  }, [data]);

  async function editElement(dataForm) {
    if (type === "customers") {
      toast.promise(CustomerApi.updateCustomer(dataForm, idEdit), {
        loading: "Editando comprador",
        success: () => {
          viewEditModal();
          mutate(apiURL);
          return "La información se actualizó correctamente";
        },
        error: "Error editando la información",
      });
    } else if (type === "suppliers") {
      toast.promise(SuppliersApi.updateSupplier(dataForm, idEdit), {
        loading: "Editando proveedor",
        success: () => {
          viewEditModal();
          mutate(apiURL);
          return "La información se actualizó correctamente";
        },
        error: "Error editando la información",
      });
    } else if (type === "products") {
      toast.promise(ProductsApi.updateProduct(dataForm, idEdit), {
        loading: "Editando producto",
        success: () => {
          viewEditModal();
          mutate(apiURL);
          return "La información se actualizó correctamente";
        },
        error: "Error editando la información",
      });
    } else if (type === "purchases") {
      await PurchasesApi.updatePurchase(dataForm, data.purchase_id);
      toast.promise(PurchasesDetailsApi.updatePurchaseDetail(dataForm), {
        loading: "Editando pedido",
        success: () => {
          viewEditModal();
          mutate(apiURL);
          return "La información se actualizó correctamente";
        },
        error: "Error editando la información",
      });
    }
  }

  return (
    <Modal
      icon={<PencilCircle size={26} color="#3b82f6" />}
      size="xl"
      show={editModal}
      onClose={() => {
        viewEditModal();
        reset();
        setData({});
      }}
    >
      <Modal.Header>
        {type === "customers" && <>Editar comprador</>}
        {type === "suppliers" && <>Editar proveedor</>}
        {type === "products" && <>Editar producto</>}
        {type === "purchases" && <>Editar pedido</>}
        {type === "sales" && <>Editar venta</>}
      </Modal.Header>
      <Modal.Body>
        <form
          className="grid grid-cols-4 gap-2 p-5 w-full"
          onSubmit={handleSubmit(editElement)}
        >
          {(type === "customers" || type === "suppliers") && (
            <>
              {data.name ? (
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
                        pattern: /^[A-Za-z ]+$/,
                      })}
                    />
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
                      {...register("address")}
                    />
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
                        pattern: /^[0-9]+$/,
                      })}
                    />
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
                      placeholder="Correo electrónico"
                      {...register("email", {
                        pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                      })}
                    />
                    {errors.email?.type === "pattern" && (
                      <div className="text-red-600 text-center">
                        <small>Correo electrónico no valido.</small>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div
                  role="status"
                  className="flex justify-center items-center col-span-4"
                >
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Cargando...</span>
                </div>
              )}
            </>
          )}
          {type === "products" && (
            <>
              {data.name ? (
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
                      {...register("name")}
                    />
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
                        pattern: /^[0-9]+$/,
                      })}
                    />
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
                        pattern: /^[0-9]+$/,
                      })}
                    />
                    {errors.stock?.type === "pattern" && (
                      <div className="text-red-600 text-center">
                        <small>Stock no valido.</small>
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
                        pattern: /^[0-9]+$/,
                      })}
                    />
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
                      {...register("description")}
                      style={{ resize: "none" }}
                    />
                  </div>
                </>
              ) : (
                <div
                  role="status"
                  className="flex justify-center items-center col-span-4"
                >
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Cargando...</span>
                </div>
              )}
            </>
          )}
          {type === "purchases" && (
            <>
              {data.id ? (
                <>
                  <div className="col-span-2 w-full">
                    <label className="block text-sm font-medium leading-8">
                      Proveedor
                    </label>
                    <select
                      className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                      name="supplier_id"
                      {...register("supplier_id")}
                    >
                      <option value="">Seleccione el proveedor</option>
                      {suppliers?.map((supplier) => (
                        <option key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </option>
                      ))}
                    </select>
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
                      {...register("date")}
                    />
                  </div>
                  <div className="col-span-2 w-full">
                    <label className="block text-sm font-medium leading-8">
                      Producto
                    </label>
                    <select
                      className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                      name="product_id"
                      {...register("product_id")}
                    >
                      <option value="">Seleccione el producto</option>
                      {products?.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
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
                        pattern: /^[0-9]+$/,
                        min: 1,
                      })}
                    />
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
              ) : (
                <div
                  role="status"
                  className="flex justify-center items-center col-span-4"
                >
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Cargando...</span>
                </div>
              )}
            </>
          )}
          {type === "sales" && (
            <>
              {data.id ? (
                <>
                  <div className="col-span-2 w-full">
                    <label className="block text-sm font-medium leading-8">
                      Comprador
                    </label>
                    <select
                      className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                      name="customer_id"
                      {...register("customer_id")}
                    >
                      <option value="">Seleccione el comprador</option>
                      {customers?.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.name}
                        </option>
                      ))}
                    </select>
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
                      {...register("date")}
                    />
                  </div>
                  <div className="col-span-2 w-full">
                    <label className="block text-sm font-medium leading-8">
                      Producto
                    </label>
                    <select
                      className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                      name="product_id"
                      {...register("product_id")}
                    >
                      <option value="">Seleccione el producto</option>
                      {products?.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
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
                        pattern: /^[0-9]+$/,
                        min: 1,
                      })}
                    />
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
              ) : (
                <div
                  role="status"
                  className="flex justify-center items-center col-span-4"
                >
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Cargando...</span>
                </div>
              )}
            </>
          )}
          <div className="flex items-end justify-center gap-2 col-span-4 mt-4">
            <button
              className="bg-blue-500 rounded-md shadow-lg text-white h-10 w-28"
              type="button"
              onClick={() => {
                viewEditModal();
                reset();
                setData({});
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
