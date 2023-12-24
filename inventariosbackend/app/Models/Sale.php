<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;
    protected $appends = ['customer'];
    protected $fillable = [
        'customer_id',
        'date'
    ];

    function getCustomerAttribute() {
        $customerId = $this->customer_id;
        $data = Customer::find($customerId);
        return $data->name;
    }

    public function saleDetails()
    {
        return $this->hasMany(SaleDetail::class, 'sale_id');
    }

}
