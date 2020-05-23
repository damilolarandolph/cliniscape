<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Prescription extends Model
{
    protected $table = 'prescriptions';
    protected $guarded = [];

    public function isAvailable()
    {
        return Medicine::where('name', $this->medicine_name)
            ->where('dosage', $this->dosage)
            ->where('quantity', '>=', $this->quantity)
            ->exists();
    }

    public function appointment()
    {
        return $this->belongsTo(Appointment::class, 'for_appointment', 'id');
    }
}
