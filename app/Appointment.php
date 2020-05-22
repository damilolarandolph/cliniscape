<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $table = "appointments";
    public $timestamps = false;
    protected $fillable = [
        'doctor_email',
        'patient_email',
        'status',
        'appointment_details'
    ];

    protected $casts = [
        'appointment_details' => 'array'
    ];

    public function doctor()
    {
        return $this->belongsTo(Doctor::class, 'doctor_email', 'email');
    }

    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_email', 'email');
    }

    public function prescriptions()
    {
        return $this->hasMany(Prescription::class, 'for_appointment', 'id');
    }

    public function invoiceItems()
    {
        return $this->hasMany(InvoiceItem::class, 'for_appointment', 'id');
    }
}
