<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class AccountType extends Model
{
    protected $table = 'account_types';
    public $timestamps = false;

    public function users()
    {
        return $this->hasMany(User::class, 'account_type');
    }
}
