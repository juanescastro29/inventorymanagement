<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleDetail;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    function createSale(Request $request)
    {
        try {
            $customer_id = $request->input('customer_id');
            $date = $request->input('date');

            $saleData = array('customer_id' => $customer_id, 'date' => $date);

            $newSale = Sale::create($saleData);
            if ($newSale) {
                return [
                    'sale_id' => $newSale->id
                ];
            } else {
                return [
                    'statusCode' => 2323
                ];
            }
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    function getSales()
    {
        try {
            $data = Sale::get();
            if (!empty($data)) {
                return $data;
            } else {
                return [
                    'statusCode' => 2323
                ];
            }
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    function getSale($id)
    {
        try {
            $sale = Sale::find($id);
            if ($sale) {
                return $sale;
            } else {
                return [
                    'statusCode' => 2323
                ];
            }
        } catch (\Throwable $th) {
            $th->getMessage();
        }
    }

    function updateSale(Request  $request, $id)
    {
        try {
            $sale = Sale::find($id);
            if (!$sale) {
                return [
                    'message' => 'Purchase not found'
                ];
            }

            $customer_id = $request->input('customer_id');
            $date = $request->input('date');

            $saleData = array('customer_id' => $customer_id, 'date' => $date);

            $saleUpdate = Sale::where('id', $id)->update($saleData);
            if ($saleUpdate) {
                return [
                    'message' => 'Purchase updated'
                ];
            } else {
                return [
                    'statusCode' => 2323
                ];
            }
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    function deleteSale($id)
    {
        try {
            $sale = Sale::find($id);
            if (!$sale) {
                return [
                    'message' => 'Sale not found'
                ];
            }

            $salesDetails = SaleDetail::where("sale_id", $id)->get();

            foreach ($salesDetails as $detail) {
                $product = Product::find($detail->product_id);
                $newStock = $product->stock + $detail->quantity;
                $data = array('stock' => $newStock);
                Product::where("id", $detail->product_id)->update($data);
            }

            $sale->saleDetails()->delete();
            $saleDeleted = $sale->delete();

            if ($saleDeleted) {
                return response("Sale deleted", 200);
            } else {
                return [
                    'statusCode' => 2323
                ];
            }
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }
}

