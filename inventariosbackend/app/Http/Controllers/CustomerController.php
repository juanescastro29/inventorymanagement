<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{

    function createCustomer(Request $request)
    {
        try {
            $name = $request->input('name');
            $address = $request->input('address');
            $phone = $request->input('phone');
            $email = $request->input('email');

            $customerData = array('name' => $name, 'address' => $address, 'phone' => $phone, 'email' => $email);

            $newCustomer = Customer::insert($customerData);
            if ($newCustomer) {
                return [
                    "data" => "Customer created"
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

    function getCustomers()
    {
        try {
            $data = Customer::get();
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

    function getCustomer($id)
    {
        try {
            $customer = Customer::find($id);
            if ($customer) {
                return $customer;
            } else {
                return [
                    "statusCode" => 2323
                ];
            }
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    function updateCustomer(Request $request, $id)
    {
        try {

            $customer = Customer::find($id);
            if (!$customer) {
                return [
                    'message' => 'Customer not found'
                ];
            }

            $name = $request->input('name');
            $address = $request->input('address');
            $phone = $request->input('phone');
            $email = $request->input('email');

            $customerData = array('name' => $name, 'address' => $address, 'phone' => $phone, 'email' => $email);

            $updatedCustomer = Customer::where('id', $id)->update($customerData);
            if ($updatedCustomer) {
                return [
                    "message" => "Customer updated"
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

    function deleteCustomer($id)
    {
        try {
            echo $id;
            $customer = Customer::find($id);
            if (!$customer) {
                return [
                    'message' => 'Customer not found'
                ];
            }

            $deletedCustomer = Customer::where('id', $id)->delete();
            if ($deletedCustomer) {
                return [
                    "message" => "Customer deleted"
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
}
