<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DoctorTypeMap extends Model
{
    protected $table = 'doctor_types_map';
    public $timestamps = false;
    protected $fillable = ['doctor_type_id', 'doctor_email'];

    public function doctor()
    {
        return $this->belongsTo(Doctor::class, 'doctor_email', 'email');
    }

    public function type()
    {
        return $this->belongsTo(DoctorType::class, 'doctor_type_id', 'id');
    }
}
