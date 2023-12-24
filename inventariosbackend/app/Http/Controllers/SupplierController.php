<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    function createSupplier(Request $request)
    {
        try {
            $name = $request->input('name');
            $address = $request->input('address');
            $phone = $request->input('phone');
            $email = $request->input('email');

            $supplierData = array('name' => $name, 'address' => $address, 'phone' => $phone, 'email' => $email);

            $newSupplier = Supplier::insert($supplierData);
            if ($newSupplier) {
                return [
                    "data" => "Supplier created"
                ];
            } else {
                return [
                    "statusCode" => 2323
                ];
            }
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    function getSuppliers()
    {
        try {
            $data = Supplier::get();
            if (!empty($data)) {
                return $data;
            } else {
                return [
                    "statusCode" => 2323
                ];
            }
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    function getSupplier($id)
    {
        try {
            $supplier = Supplier::find($id);
            if ($supplier) {
                return $supplier;
            } else {
                return [
                    "statusCode" => 2323
                ];
            }
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    function updateSupplier(Request $request, $id)
    {
        try {

            $supplier = Supplier::find($id);
            if ($supplier) {
                return [
                    'message' => 'Supplier not found'
                ];
            }

            $name = $request->input('name');
            $address = $request->input('address');
            $phone = $request->input('phone');
            $email = $request->input('email');

            $supplierData = array('name' => $name, 'address' => $address, 'phone' => $phone, 'email' => $email);

            $updatedSupplier = Supplier::where('id', $id)->update($supplierData);
            if ($updatedSupplier) {
                return [
                    "message" => "Supplier updated"
                ];
            } else {
                return [
                    "statusCode" => 2323
                ];
            }
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    function deleteSupplier($id)
    {
        try {
            $supplier = Supplier::find($id);
            if (!$supplier) {
                return [
                    'message' => 'Supplier not found'
                ];
            }

            $deletedSupplier = Supplier::where('id', $id)->delete();
            if ($deletedSupplier) {
                return response("Supplier deleted", 200);
            } else {
                return [
                    "statusCode" => 2323
                ];
            }
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }
}
