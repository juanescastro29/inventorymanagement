import Link from "next/link";
import Customers from "@/assets/customers.png";
import Suppliers from "@/assets/suppliers.png";
import Products from "@/assets/products.png";
import Purchases from "@/assets/purchases.png";
import Sales from "@/assets/sales.png";
import Image from "next/image";

export const Navbar = () => {
  return (
    <>
      <div className="grid grid-cols-1 mt-5 justify-center gap-2 text-center">
        <h1 className="text-center text-2xl">
          Sistema de gestión de inventario
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 p-8 justify-center content-center align-middle gap-2 text-center">
        <Link
          className="bg-blue-300 rounded-md shadow-lg text-white flex items-center justify-center h-12 w-auto"
          href="/customers"
        >
          <Image src={Customers} alt="customers" width={32} />
          <span className="p-3 w-auto">COMPRADORES</span>
        </Link>
        <Link
          className="bg-blue-300 rounded-md shadow-lg text-white flex items-center justify-center h-12"
          href="/suppliers"
        >
          <Image src={Suppliers} alt="suppliers" width={32} />
          <span className="p-3 w-auto">PROVEEDORES</span>
        </Link>
        <Link
          className="bg-blue-300 rounded-md shadow-lg text-white flex items-center justify-center h-12"
          href="/products"
        >
          <Image src={Products} alt="productos" width={32} />
          <span className="p-3 w-auto">PRODUCTOS</span>
        </Link>
        <Link
          className="bg-blue-300 rounded-md shadow-lg text-white flex items-center justify-center h-12"
          href="/purchases"
        >
          <Image src={Purchases} alt="purchases" width={32} />
          <span className="p-3 w-auto">PEDIDOS</span>
        </Link>
        <Link
          className="bg-blue-300 rounded-md shadow-lg text-white flex items-center justify-center h-12"
          href="/sales"
        >
          <Image src={Sales} alt="sales" width={32} />
          <span className="p-3 w-auto">VENTAS</span>
        </Link>
      </div>
    </>
  );
};
