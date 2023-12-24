<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Purchase;
use App\Models\PurchaseDetail;
use Illuminate\Http\Request;

class PurchaseDetailController extends Controller
{
    function createPurchaseDetail(Request $request)
    {
        try {
            $purchase_id = $request->input('purchase_id');
            $product_id = $request->input('product_id');

            $purchase = Purchase::find($purchase_id);
            $product = Product::find($product_id);

            if (!$purchase || !$product) {
                return [
                    'message' => 'Purchase or product not found'
                ];
            }

            $description = $request->input('description');
            $quantity = $request->input('quantity');
            $price = $product->purchasePrice;
            $total = $price * $quantity;
            $newStock = array('stock' => ($product->stock + $quantity));
            Product::where('id', $product_id)->update($newStock);

            $detailData = array('purchase_id' => $purchase_id, 'product_id' => $product_id, 'description' => $description, 'quantity' => $quantity, 'price' => $price, 'total' => $total);

            $newDetail = PurchaseDetail::insert($detailData);
            if ($newDetail) {
                return [
                    'message' => 'Detail created'
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

    function getPurchaseDetails()
    {
        try {
            $data = PurchaseDetail::get();
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

    function getPurchaseDetail($id)
    {
        try {
            $purchaseDetail = PurchaseDetail::find($id);
            if ($purchaseDetail) {
                return $purchaseDetail;
            } else {
                return [
                    'statusCode' => 2323
                ];
            }
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    function updatePurchaseDetail(Request $request)
    {
        try {
            $detail_id = $request->input('id');
            error_log($detail_id);
            $detail = PurchaseDetail::find($detail_id);

            if (!$detail) {
                return [
                    'message' => 'Detail not found'
                ];
            }

            $product = Product::find($detail->product_id);

            $description = $request->input('description');
            $quantity = $request->input('quantity');
            $price = $product->purchasePrice;
            $total = $price * $quantity;
            if($quantity > $detail->quantity) {
                $difference = abs($quantity - $detail->quantity);
                $newStock = array('stock' => ($product->stock + $difference));
            }else {
                $difference = abs($quantity - $detail->quantity);
                $newStock = array('stock' => ($product->stock - $difference));
            }
            Product::where('id', $product->id)->update($newStock);

            $detailData = array('description' => $description, 'quantity' => $quantity, 'price' => $price, 'total' => $total);

            $detailUpdated = PurchaseDetail::where('id', $detail_id)->update($detailData);
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
