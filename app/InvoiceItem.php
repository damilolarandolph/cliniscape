<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class InvoiceItem extends Model
{
    protected $table = 'invoice_items';
    protected $guarded = [];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class, 'for_appointment', 'id');
    }

    public static function invoicesPayable()
    {
        $items = [
            'paid' => 0,
            'owing' => 0
        ];

        foreach (InvoiceItem::all() as $invoiceItem) {
            if ($invoiceItem->paid) {
                ++$items['paid'];
            } else {
                ++$items['owing'];
            }
        }

        return $items;
    }

    public static function todayItems()
    {
        $today = InvoiceItem::all()->filter(function ($elem) {

            return $elem->created_at->isSameDay(Carbon::now());
        });
        return $today;
    }

    public static function rankItems()
    {
        $items = [];

        foreach (InvoiceItem::all() as $invoiceItem) {
            if (!isset($items["{$invoiceItem->description}"])) {
                $items["{$invoiceItem->description}"] = 0;
            }
            ++$items["{$invoiceItem->description}"];
        }

        arsort($items);

        return $items;
    }

    public static function itemsCount()
    {
        $items = [
            'month' => 0,
            'total' => 0
        ];

        foreach (InvoiceItem::all() as $item) {
            if ($item->created_at->month == Carbon::now()->month) {
                ++$items['month'];
            }

            ++$items['total'];
        }

        return $items;
    }
}
