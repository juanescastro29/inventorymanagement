<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Customer;
use App\Models\Product;
use App\Models\Purchase;
use App\Models\PurchaseDetail;
use App\Models\Sale;
use App\Models\SaleDetail;
use App\Models\Supplier;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $customers = [
            [
                'name' => 'juan',
                'address' => 'Carrera 29b',
                'phone' => "31024555",
                'email' => "juanesssss@gmail.com"
            ]
        ];

        $suppliers = [
            [
                'name' => 'juan',
                'address' => 'Carrera 29a',
                'phone' => "3102488929",
                'email' => "juanes@gmail.com"
            ]
        ];

        $products = [
            [
                'name' => "pan",
                'description' => "pan a base de almendras",
                'purchasePrice' => 2.5,
                'salePrice' => 4.0,
                'stock' => 10
            ]
        ];

        $purchases = [
            [
                'supplier_id' => 1,
                'date' => Carbon::create(2000, 06, 15)
            ]
        ];

        $purchases_details = [
            [
                'purchase_id' => 1,
                'product_id' => 1,
                'description' => "compra al por mayor de producto",
                'quantity' => 500,
                'price' => 2.5,
                'total' => 1250.0,
            ]
        ];

        $sales = [
            [
                'customer_id' => 1,
                'date' => Carbon::create(2000, 06, 15)
            ]
        ];

        $sales_details = [
            [
                'sale_id' => 1,
                'product_id' => 1,
                'description' => "venta a customer",
                'quantity' => 2,
                'price' => 4.0,
                'total' => 8.0
            ]
        ];

        Customer::insert($customers);
        Supplier::insert($suppliers);
        Product::insert($products);
        Purchase::insert($purchases);
        PurchaseDetail::insert($purchases_details);
        Sale::insert($sales);
        SaleDetail::insert($sales_details);

    }
}
