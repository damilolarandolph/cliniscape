<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;


class Doctor extends User
{

    protected static function booted()
    {
        static::addGlobalScope('account_type', function (Builder $builder) {
            $builder->where('account_type', '=', 2)
                ->orWhere('account_type', '=', 1);
        });
    }

    public function rankTreatments()
    {
        $services = [];

        foreach ($this->completedAppointments() as $appointment) {
            //  dd($appointment->appointment_details);
            if (!isset($appointment->appointment_details["services"]))
                continue;
            $service = $appointment->appointment_details["services"];
            foreach ($this->typeMap->type['services_rendered'] as $index => $value) {

                if (in_array($index, $service)) {
                    if (!isset($services[$value['description']])) {
                        $services[$value['description']] = 0;
                    }

                    ++$services[$value['description']];
                }
            }
        }


        arsort($services);

        return $services;
    }

    function patientsCount()
    {
        $count = [0, 0];

        $seenPatients = [];
        $currDate = Carbon::now();
        foreach ($this->completedAppointments() as $appointment) {
            $date = Carbon::parse("{$appointment->appointment_details['time']} {$appointment->appointment_details['start-time']}:00");

            if (!isset($seenPatients[$appointment->patient->email])) {
                if ($date->month == $currDate->month) {
                    ++$count[1];
                }
                ++$count[0];
                $seenPatients[$appointment->patient->email] = true;
            }
        }


        return $count;
    }


    function appointments()
    {
        return $this->hasMany(Appointment::class, 'doctor_email', 'email');
    }

    function labResults()
    {
        return $this->hasMany(LabResult::class, 'doctor_email', 'email');
    }

    public function typeMap()
    {
        return $this->hasOne(DoctorTypeMap::class, 'doctor_email', 'email');
    }
}
