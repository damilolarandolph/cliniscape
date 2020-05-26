<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Prescription extends Model
{
    protected $table = 'prescriptions';
    protected $guarded = [];

    public function isAvailable()
    {
        return Medicine::where('name', $this->medicine_name)
            ->where('dosage', $this->dosage)
            ->where('quantity', '>=', $this->quantity)
            ->exists();
    }

    static function getCollected()
    {
        $collected_status = [
            'waiting' => 0,
            'collected' => 0
        ];

        foreach (Prescription::all() as $prescription) {
            if ($prescription->collected)
                ++$collected_status['collected'];
            else
                ++$collected_status['waiting'];
        }

        return $collected_status;
    }

    static function todaysPrescriptions()
    {
        $today = Prescription::all()->filter(function ($elem) {

            return $elem->created_at->isSameDay(Carbon::now());
        });

        return $today;
    }

    static function rankPrescriptions()
    {
        $prescriptions = [];

        foreach (Prescription::all() as $prescription) {
            if (!isset($prescriptions["{$prescription->medicine_name} ({$prescription->dosage})"])) {
                $prescriptions["{$prescription->medicine_name} ({$prescription->dosage})"] = 0;
            }

            ++$prescriptions["{$prescription->medicine_name} ({$prescription->dosage})"];
        }

        arsort($prescriptions);

        return $prescriptions;
    }


    public function appointment()
    {
        return $this->belongsTo(Appointment::class, 'for_appointment', 'id');
    }
}
