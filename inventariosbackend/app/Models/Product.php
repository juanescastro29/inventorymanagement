<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'purchasePrice',
        'salePrice',
        'stock'
    ];

    public function salesDetails()
    {
        return $this->hasMany(SaleDetail::class, 'product_id');
    }

    public function purchasesDetails()
    {
        return $this->hasMany(PurchaseDetail::class, 'product_id');
    }

}
