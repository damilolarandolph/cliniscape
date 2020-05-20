<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserDetails extends Model
{
    protected $table = 'user_details';
    public $timestamps = false;

    protected $fillable = ['basic_details', 'extended_details'];
    protected $casts = [
        'extended_details' => 'json',
        'basic_details' => 'json'
    ];
}
