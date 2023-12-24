import { Modal } from "keep-react";
import { Trash } from "phosphor-react";
import toast from "react-hot-toast";
import CustomerApi from "../api/CustomersApi";
import { mutate } from "swr";
import { apiURL } from "../api";
import SuppliersApi from "../api/SuppliersApi";
import ProductsApi from "../api/ProductsApi";
import PurchasesApi from "../api/PurchasesApi";
import SalesApi from "../api/SalesApi";

const ConfirmModal = ({ confirmModal, viewConfirmModal, type, idDelete }) => {
  const handleConfrim = () => {
    if (type === "customers") {
      toast.promise(CustomerApi.deleteCustomer(idDelete), {
        loading: "Eliminando comprador",
        success: () => {
          mutate(apiURL);
          viewConfirmModal();
          return "Comprador eliminado";
        },
        error: "Error al eliminar comprdador",
      });
    } else if (type === "suppliers") {
      toast.promise(SuppliersApi.deleteSupplier(idDelete), {
        loading: "Eliminando proveedor",
        success: () => {
          mutate(apiURL);
          viewConfirmModal();
          return "Proveedor eliminado";
        },
        error: "Error al eliminar proveedo.",
      });
    } else if (type === "products") {
      toast.promise(ProductsApi.deleteProduct(idDelete), {
        loading: "Eliminando producto",
        success: () => {
          mutate(apiURL);
          viewConfirmModal();
          return "Producto eliminado";
        },
        error: "Error al eliminar producto",
      });
    } else if (type === "purchases") {
      toast.promise(PurchasesApi.deletePurchase(idDelete), {
        loading: "Eliminando pedido",
        success: () => {
          mutate(apiURL);
          viewConfirmModal();
          return "Pedido eliminado";
        },
        error: "Error al eliminar pedido",
      });
    } else if (type === "sales") {
      toast.promise(SalesApi.deleteSales(idDelete), {
        loading: "Eliminando venta",
        success: () => {
          mutate(apiURL);
          viewConfirmModal();
          return "Venta eliminada";
        },
        error: "Error al eliminar venta",
      });
    }
  };

  return (
    <Modal
      icon={<Trash size={26} color="#3b82f6" />}
      size="lg"
      show={confirmModal}
      onClose={viewConfirmModal}
    >
      <Modal.Header>¿Seguro que quiere eliminar esta fila?</Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer className="justify-center">
        <button
          className="bg-blue-500 rounded-md shadow-lg text-white h-10 w-28"
          onClick={viewConfirmModal}
        >
          Cancelar
        </button>
        <button
          className="bg-blue-500 rounded-md shadow-lg text-white h-10 w-28"
          onClick={handleConfrim}
        >
          Confirmar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
