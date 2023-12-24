<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;
    protected $appends = ["supplier"];
    protected $fillable = [
        'supplier_id',
        'date'
    ];

    function getSupplierAttribute() {
        $supplierId = $this->supplier_id;
        $data = Supplier::find($supplierId);
        return $data->name;
    }

    public function purchaseDetails()
    {
        $this->hasMany(PurchaseDetail::class, 'purchase_id');
        return $this->hasMany(PurchaseDetail::class, 'purchase_id');
    }

}
