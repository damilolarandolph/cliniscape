<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class User extends Model
{
    protected $table = 'users';
    public $timestamps = false;

    protected $guarded = [];
    function __constructWithItems($name, $email, $password, $accountType)
    {
        $this->name = $name;
        $this->email = $email;
        $this->password = Hash::make($password);
        $this->account_type = $accountType;
    }

    protected static function booted()
    {
        static::addGlobalScope('account_type', function (Builder $builder) {
            $builder->where('account_type', '=', 3);
        });
    }


    function userDetails()
    {
        return $this->hasOne(UserDetails::class, 'user_email', 'email');
    }

    function appointments()
    {
        return $this->hasMany(Appointment::class, 'patient_email', 'email');
    }

    function labResults()
    {
        return $this->hasMany(LabResult::class, 'patient_email', 'email');
    }
}
