<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class User extends Model
{
    protected $table = 'users';
    public $timestamps = false;

    function __construct($name, $email, $password, $accountType)
    {
        $this->name = $name;
        $this->email = $email;
        $this->password = Hash::make($password);
        $this->account_type = $accountType;
    }

    public function accountType()
    {
        return $this->belongsTo("App/AccountType", 'account_type');
    }
}
