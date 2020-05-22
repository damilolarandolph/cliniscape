<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LabResult extends Model
{
    protected $table = 'lab_results';

    protected $casts = [
        'lab_result_details' => 'array'
    ];

    public $timestamps = false;

    protected $fillable = [
        'lab_result_details',
        'doctor_email',
        'patient_email'
    ];

    public function doctor()
    {
        return $this->belongsTo(Doctor::class, 'doctor_email', 'email');
    }

    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_email', 'email');
    }
}
