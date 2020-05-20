<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DoctorType extends Model
{
    protected $table = 'doctor_types';
    public $timestamps = false;

    protected $fillable = [
        'serviced_rendered',
        'title',
        'description'
    ];

    protected $casts = [
        'services_rendered' => 'json'
    ];

    public function doctors()
    {
        return  $this->hasMany(DoctorTypeMap::class, 'doctor_type_id', 'id');
    }
}
