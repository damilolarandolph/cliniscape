<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    protected $table = 'medicine_inventory';
    protected $guarded = [];

    static function lowStockMedicine()
    {

        $items = Medicine::all()->toArray();
        uasort($items, function ($a, $b) {
            if ($a['quantity'] == $b['quantity']) {
                return 0;
            }

            return ($a['quantity'] < $b['quantity']) ? -1 : 1;
        });

        return $items;
    }
}
