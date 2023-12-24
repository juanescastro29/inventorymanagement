<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleDetail;
use Illuminate\Http\Request;

class SaleDetailController extends Controller
{
    function createSaleDetail(Request $request)
    {
        try {
            $sale_id = $request->input('sale_id');
            $product_id = $request->input('product_id');

            $sale = Sale::find($sale_id);
            $product = Product::find($product_id);

            if (!$sale || !$product) {
                return [
                    'message' => 'Sale or product not found'
                ];
            }


            $quantity = $request->input('quantity');

            if ($quantity > $product->stock) {
                Sale::where('id', $sale_id)->delete();
                return response("Producto sin stock", 409);
            } else {
                $newStock = array('stock' => ($product->stock - $quantity));
                Product::where('id', $product_id)->update($newStock);
            }

            $description = $request->input('description');
            $price = $product->salePrice;
            $total = $price * $quantity;

            $detailData = array('sale_id' => $sale_id, 'product_id' => $product_id, 'description' => $description, 'quantity' => $quantity, 'price' => $price, 'total' => $total);

            $newDetail = SaleDetail::insert($detailData);
            if ($newDetail) {
                return response("Detail created", 200);
            } else {
                return [
                    'statusCode' => 2323
                ];
            }
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    function getSaleDetails()
    {
        try {
            $data = SaleDetail::get();
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

    function getSaleDetail($id)
    {
        try {
            $saleDetail = SaleDetail::find($id);
            if ($saleDetail) {
                return $saleDetail;
            } else {
                return [
                    'statusCode' => 2323
                ];
            }
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    function updateSaleDetail(Request $request)
    {
        try {
            $detail_id = $request->input('detail_id');
            $detail = SaleDetail::find($detail_id);

            if ($detail) {
                return [
                    'message' => 'Detail not found'
                ];
            }

            $product = Product::find($detail->product_id);
            $quantity = $request->input('quantity');

            if ($quantity > $product->stock) {
                return [
                    'message' => 'Out of stock'
                ];
            } else {
                $newStock = array('stock' => ($product->stock - $quantity));
                Product::where('id', $product->id)->update($newStock);
            }

            $description = $request->input('description');
            $price = $product->salePrice;
            $total = $price * $quantity;

            $detailData = array('description' => $description, 'quantity' => $quantity, 'price' => $price, 'total' => $total);

            $detailUpdated = SaleDetail::where('id', $detail_id)->update($detailData);
            if ($detailUpdated) {
                return [
                    'message' => 'Detail updated'
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
}
