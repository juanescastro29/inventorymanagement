<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\SaleDetail;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    function createProduct(Request $request)
    {
        $name = $request->input('name');
        $description = $request->input('description');
        $purchasePrice = $request->input('purchasePrice');
        $salePrice = $request->input('salePrice');
        $stock = $request->input('stock');

        $productData = array('name' => $name, 'description' => $description, 'purchasePrice' => $purchasePrice, 'salePrice' => $salePrice, 'stock' => $stock);

        $newProduct = Product::insert($productData);

        if ($newProduct) {
            return [
                "message" => "Product created"
            ];
        } else {
            return [
                "statusCode" => 2323
            ];
        }
    }

    function getProducts()
    {
        try {
            $data = Product::get();
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

    function getProduct($id)
    {
        try {
            $product = Product::find($id);
            if ($product) {
                return $product;
            } else {
                return [
                    'statusCode' => 2323
                ];
            }
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    function updateProduct(Request  $request, $id)
    {
        try {

            $product = Product::find($id);
            if (!$product) {
                return [
                    'message' => 'Product not found'
                ];
            }

            $name = $request->input('name');
            $description = $request->input('description');
            $purchasePrice = $request->input('purchasePrice');
            $salePrice = $request->input('salePrice');
            $stock = $request->input('stock');

            $productData = array('name' => $name, 'description' => $description, 'purchasePrice' => $purchasePrice, 'salePrice' => $salePrice, 'stock' => $stock);

            $updatedProduct = Product::where('id', $id)->update($productData);

            if ($updatedProduct) {
                return [
                    'message' => "Product updated"
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

    function deleteProduct($id)
    {
        try {

            $product = Product::find($id);
            if (!$product) {
                return [
                    'message' => 'Product not found'
                ];
            }

            $product->salesDetails()->delete();
            $product->purchasesDetails()->delete();
            $deletedProduct = Product::where('id', $id)->delete();
            if ($deletedProduct) {
                return response("Product deleted", 200);
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
