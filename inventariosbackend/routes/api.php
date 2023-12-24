<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\PurchaseDetailController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\SaleDetailController;
use App\Http\Controllers\SupplierController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Customer endpoints
Route::post('/customers', [CustomerController::class, 'createCustomer']);
Route::get('/customers', [CustomerController::class, 'getCustomers']);
Route::get('/customers/{id}', [CustomerController::class, 'getCustomer']);
Route::put('/customers/{id}', [CustomerController::class, 'updateCustomer']);
Route::delete('/customers/{id}', [CustomerController::class, 'deleteCustomer']);

//Products endpoints
Route::post('/products', [ProductController::class, 'createProduct']);
Route::get('/products', [ProductController::class, 'getProducts']);
Route::get('/products/{id}', [ProductController::class, 'getProduct']);
Route::put('/products/{id}', [ProductController::class, 'updateProduct']);
Route::delete('/products/{id}', [ProductController::class, 'deleteProduct']);

//Purchase endpoints
Route::post('/purchases', [PurchaseController::class, 'createPurchase']);
Route::put('/purchases/{id}', [PurchaseController::class, 'updatePurchase']);
Route::delete('/purchases/{id}', [PurchaseController::class, 'deletePurchase']);

//PurchaseDetails endpoints
Route::post('/purchasesDetails', [PurchaseDetailController::class, 'createPurchaseDetail']);
Route::get('/purchasesDetails', [PurchaseDetailController::class, 'getPurchaseDetails']);
Route::get('/purchasesDetails/{id}', [PurchaseDetailController::class, 'getPurchaseDetail']);
Route::put('/purchasesDetails', [PurchaseDetailController::class, 'updatePurchaseDetail']);

//Sales endpoints
Route::post('/sales', [SaleController::class, 'createSale']);
Route::put('/sales/{id}', [SaleController::class, 'updateSale']);
Route::delete('/sales/{id}', [SaleController::class, 'deleteSale']);

//SaleDetails endpoints
Route::post('/salesDetails', [SaleDetailController::class, 'createSaleDetail']);
Route::get('/salesDetails', [SaleDetailController::class, 'getSaleDetails']);
Route::get('/salesDetails/{id}', [SaleDetailController::class, 'getSaleDetail']);
Route::put('/salesDetails', [SaleDetailController::class, 'updateSaleDetail']);

//Supplier endpoints
Route::post('/suppliers', [SupplierController::class, 'createSupplier']);
Route::get('/suppliers', [SupplierController::class, 'getSuppliers']);
Route::get('/suppliers/{id}', [SupplierController::class, 'getSupplier']);
Route::put('/suppliers/{id}', [SupplierController::class, 'updateSupplier']);
Route::delete('/suppliers/{id}', [SupplierController::class, 'deleteSupplier']);
