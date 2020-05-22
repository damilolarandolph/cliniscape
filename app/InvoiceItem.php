<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InvoiceItem extends Model
{
    protected $table = 'invoice_items';
    protected $guarded = [];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class, 'for_appointment', 'id');
    }
}
