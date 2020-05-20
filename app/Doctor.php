<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Doctor extends User
{


    function appointments()
    {
        return $this->hasMany(Appointment::class, 'doctor_email', 'email');
    }

    public function typeMap()
    {
        return $this->hasOne(DoctorTypeMap::class, 'doctor_email', 'email');
    }
}
