<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseDetail extends Model
{
    use HasFactory;
    protected $appends = ['purchase', 'product', 'supplier_id', 'date'];
    protected $fillable = [
        'purchase_id',
        'product_id',
        'description',
        'quantity',
        'price',
        'total',
    ];

    function getPurchaseAttribute()
    {
        $purchaseId = $this->purchase_id;
        $data = Purchase::find($purchaseId);
        return $data;
    }

    function getProductAttribute()
    {
        $productId = $this->product_id;
        $data = Product::find($productId);
        return $data->name;
    }

    function getDateAttribute()
    {
        $purchaseId = $this->purchase_id;
        $data = Purchase::find($purchaseId);
        return $data->date;
    }

    function getSupplierIdAttribute()
    {
        $purchaseId = $this->purchase_id;
        $data = Purchase::find($purchaseId);
        return $data->supplier_id;
    }
}
