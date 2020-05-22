<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Doctor extends User
{

    protected static function booted()
    {
        static::addGlobalScope('account_type', function (Builder $builder) {
            $builder->where('account_type', '=', 2);
        });
    }

    function appointments()
    {
        return $this->hasMany(Appointment::class, 'doctor_email', 'email');
    }

    function labResults()
    {
        return $this->hasMany(LabResult::class, 'doctor_email', 'email');
    }

    public function typeMap()
    {
        return $this->hasOne(DoctorTypeMap::class, 'doctor_email', 'email');
    }
}
