<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaleDetail extends Model
{
    use HasFactory;
    protected $appends = ['sale', 'product', 'customer_id', 'date'];
    protected $fillable = [
        'sale_id',
        'product_id',
        'description',
        'quantity',
        'price',
        'total',
    ];

    function getSaleAttribute() {
        $saleId = $this->sale_id;
        $data = Sale::find($saleId);
        return $data;
    }

    function getProductAttribute() {
        $productId = $this->product_id;
        $data = Product::find($productId);
        return $data->name;
    }

    function getDateAttribute()
    {
        $saleId = $this->sale_id;
        $data = Sale::find($saleId);
        return $data->date;
    }

    function getCustomerIdAttribute()
    {
        $saleId = $this->sale_id;
        $data = Sale::find($saleId);
        return $data->customer_id;
    }


}
