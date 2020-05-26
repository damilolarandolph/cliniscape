<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MedicalSupply extends Model
{
    protected $table = 'medical_supplies';
    protected $guarded = [];

    static function lowStockMedicine()
    {

        $items = MedicalSupply::all()->toArray();
        uasort($items, function ($a, $b) {
            if ($a['quantity'] == $b['quantity']) {
                return 0;
            }

            return ($a['quantity'] < $b['quantity']) ? -1 : 1;
        });

        return $items;
    }
}
