<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Purchase;
use App\Models\PurchaseDetail;
use Exception;
use Illuminate\Http\Request;

class PurchaseController extends Controller
{

    function createPurchase(Request $request)
    {
        try {
            $supplier_id = $request->input('supplier_id');
            $date = $request->input('date');

            $purchaseData = array('supplier_id' => $supplier_id, 'date' => $date);

            $newPurchase = Purchase::create($purchaseData);
            if ($newPurchase) {
                return [
                    'purchase_id' => $newPurchase->id
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

    function getPurchases()
    {
        try {
            $data = Purchase::get();
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

    function getPurchase($id)
    {
        try {
            $purchase = Purchase::find($id);
            if ($purchase) {
                return $purchase;
            } else {
                return [
                    'statusCode' => 2323
                ];
            }
        } catch (\Throwable $th) {
            $th->getMessage();
        }
    }

    function updatePurchase(Request $request, $id)
    {
        try {
            $purchase = Purchase::find($id);
            if (!$purchase) {
                return response('Purchase not found', 400);
            }

            $supplier_id = $request->input('supplier_id');
            $date = $request->input('date');

            $purchaseData = array('supplier_id' => $supplier_id, 'date' => $date);

            $purchaseUpdate = Purchase::where('id', $id)->update($purchaseData);
            if ($purchaseUpdate) {
                return response('Purchase updated', 200);;
            } else {
                return response('Purchase not updated', 422);
            }
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    function deletePurchase($id)
    {
        try {
            $purchase = Purchase::find($id);
            if (!$purchase) {
                return response('Purchase not found', 400);
            }
            $purchaseDetails = PurchaseDetail::where("purchase_id", $id)->get();

            foreach ($purchaseDetails as $detail) {
                $product = Product::find($detail->product_id);
                $newStock = abs($detail->quantity - $product->stock);
                $data = array('stock' => $newStock);
                Product::where("id", $detail->product_id)->update($data);
            }

            $purchase->purchaseDetails()->delete();
            $purchaseDeleted = $purchase->delete();

            if ($purchaseDeleted) {
                return response("Purchase deleted", 200);
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
