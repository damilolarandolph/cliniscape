<?php

namespace App;

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


    function userDetails()
    {
        return $this->hasOne(UserDetails::class, 'user_email', 'email');
    }

    function appointments()
    {
        return $this->hasMany(Appointment::class, 'patient_email', 'email');
    }
}
