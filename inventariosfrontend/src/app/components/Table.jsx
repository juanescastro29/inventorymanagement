"use client";

import { useState } from "react";
import AddModal from "./AddModal";
import ConfirmModal from "./ConfirmModal";
import { EditModal } from "./EditModal";

const Table = ({ type, data }) => {
  const [addModal, setAddModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [idDelete, setIdDelete] = useState(0);
  const [idEdit, setIdEdit] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchableFields] = useState([
    "name",
    "phone",
    "email",
    "supplier",
    "date",
    "customer",
    "product",
  ]);

  const viewAddModal = () => {
    setAddModal(!addModal);
  };

  const viewConfirmModal = () => {
    setConfirmModal(!confirmModal);
  };

  const viewEditModal = () => {
    setEditModal(!editModal);
  };

  const filteredData = data.filter((item) => {
    return searchableFields.some((field) => {
      const value = item[field] || "";
      return value.toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  return (
    <>
      <div className="container mt-2 mx-auto p-5">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
          <div className="relative mt-1">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-auto bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Buscar"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={viewAddModal}
            className="bg-blue-300 rounded-md shadow-lg text-white flex items-center justify-center w-32 h-10"
          >
            <span className="p-3">Agregar</span>
          </button>
        </div>
        <div className="relative overflow-x-auto shadow-md mx-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              {type === "customers" && <>Tabla Compradores</>}
              {type === "suppliers" && <>Tabla Proveedores</>}
              {type === "products" && <>Tabla Productos</>}
              {type === "purchases" && <>Tabla Pedidos</>}
              {type === "sales" && <>Tabla Ventas</>}
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              {type === "customers" && (
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Dirección
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Teléfono
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Correo
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              )}
              {type === "suppliers" && (
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Dirección
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Teléfono
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Correo
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              )}
              {type === "products" && (
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Descripción
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Precio de compra
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Precio de venta
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Stock
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              )}
              {type === "purchases" && (
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Proveedor
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Fecha
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Producto
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Descripción
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Cantidad
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Precio de pedido
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              )}
              {type === "sales" && (
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Comprador
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Fecha
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Producto
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Descripción
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Cantidad
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Precio de venta
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              )}
            </thead>
            <tbody>
              {type === "customers" && (
                <>
                  {filteredData.map((customer) => (
                    <tr
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      key={customer.id}
                    >
                      <td className="px-6 py-4">{customer.id}</td>
                      <td className="px-6 py-4">{customer.name}</td>
                      <td className="px-6 py-4">{customer.address}</td>
                      <td className="px-6 py-4">{customer.phone}</td>
                      <td className="px-6 py-4">{customer.email}</td>
                      <td className="px-6 py-4">
                        <button
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => {
                            setIdEdit(customer.id);
                            viewEditModal();
                          }}
                        >
                          Editar
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => {
                            setIdDelete(customer.id);
                            viewConfirmModal();
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
              {type === "suppliers" && (
                <>
                  {filteredData.map((supplier) => (
                    <tr
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      key={supplier.id}
                    >
                      <td className="px-6 py-4">{supplier.id}</td>
                      <td className="px-6 py-4">{supplier.name}</td>
                      <td className="px-6 py-4">{supplier.address}</td>
                      <td className="px-6 py-4">{supplier.phone}</td>
                      <td className="px-6 py-4">{supplier.email}</td>
                      <td className="px-6 py-4">
                        <button
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => {
                            setIdEdit(supplier.id);
                            viewEditModal();
                          }}
                        >
                          Editar
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => {
                            setIdDelete(supplier.id);
                            viewConfirmModal();
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
              {type === "products" && (
                <>
                  {filteredData.map((product) => (
                    <tr
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      key={product.id}
                    >
                      <td className="px-6 py-4">{product.id}</td>
                      <td className="px-6 py-4">{product.name}</td>
                      <td className="px-6 py-4">{product.description}</td>
                      <td className="px-6 py-4">{product.purchasePrice}</td>
                      <td className="px-6 py-4">{product.salePrice}</td>
                      <td className="px-6 py-4">{product.stock}</td>
                      <td className="px-6 py-4">
                        <button
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => {
                            setIdEdit(product.id);
                            viewEditModal();
                          }}
                        >
                          Editar
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => {
                            setIdDelete(product.id);
                            viewConfirmModal();
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
              {type === "purchases" && (
                <>
                  {filteredData.map((purchase) => (
                    <>
                      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <td className="px-6 py-3">
                          {purchase?.purchase?.supplier}
                        </td>
                        <td className="px-6 py-3">
                          {purchase?.purchase?.date}
                        </td>
                        <td className="px-6 py-3">{purchase.product}</td>
                        <td className="px-6 py-3">{purchase.description}</td>
                        <td className="px-6 py-3">{purchase.quantity}</td>
                        <td className="px-6 py-3">{purchase.price}</td>
                        <td className="px-6 py-3">{purchase.total}</td>
                        <td className="px-6 py-4">
                          <button
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={() => {
                              setIdEdit(purchase.id);
                              viewEditModal();
                            }}
                          >
                            Editar
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={() => {
                              setIdDelete(purchase.purchase_id);
                              viewConfirmModal();
                            }}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </>
              )}
              {type === "sales" && (
                <>
                  {filteredData.map((sale) => (
                    <tr
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      key={sale.id}
                    >
                      <td className="px-6 py-3">{sale?.sale?.customer}</td>
                      <td className="px-6 py-3">{sale?.sale?.date}</td>
                      <td className="px-6 py-3">{sale.product}</td>
                      <td className="px-6 py-3">{sale.description}</td>
                      <td className="px-6 py-3">{sale.quantity}</td>
                      <td className="px-6 py-3">{sale.price}</td>
                      <td className="px-6 py-3">{sale.total}</td>
                      <td className="px-6 py-4">
                        <button
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => {
                            setIdEdit(sale.id);
                            viewEditModal();
                          }}
                        >
                          Editar
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => {
                            setIdDelete(sale.sale_id);
                            viewConfirmModal();
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {addModal ? (
        <AddModal addModal={addModal} viewAddModal={viewAddModal} type={type} />
      ) : (
        <></>
      )}
      {confirmModal ? (
        <ConfirmModal
          confirmModal={confirmModal}
          viewConfirmModal={viewConfirmModal}
          type={type}
          idDelete={idDelete}
        />
      ) : (
        <></>
      )}
      {editModal ? (
        <EditModal
          editModal={editModal}
          viewEditModal={viewEditModal}
          type={type}
          idEdit={idEdit}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Table;
