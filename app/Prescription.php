<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Prescription extends Model
{
    protected $table = 'prescriptions';
    protected $guarded = [];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class, 'for_appointment', 'id');
    }
}
