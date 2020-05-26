<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
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
        $this->userDetails->basic_details['avatar'] = '/avatar/default.jpg';
    }

    protected static function booted()
    {
        static::addGlobalScope('account_type', function (Builder $builder) {
            $builder->where('account_type', '=', 3);
        });
    }


    function userDetails()
    {
        return $this->hasOne(UserDetails::class, 'user_email', 'email');
    }

    function fullName()
    {
        $firstname = $this->userDetails->basic_details['firstname'];
        $lastname = $this->userDetails->basic_details['lastname'];
        $name = "{$firstname} {$lastname}";

        return $name;
    }

    public function rankTreatments()
    {
        $services = [];

        foreach ($this->completedAppointments() as $appointment) {
            //  dd($appointment->appointment_details);
            if (!isset($appointment->appointment_details["services"]))
                continue;
            $service = $appointment->appointment_details["services"];
            $doctorType = $appointment->doctor->typeMap->type;
            foreach ($doctorType->services_rendered as $index => $value) {
                if (in_array($index, $service)) {
                    if (!isset($services[$value['description']])) {
                        $services["{$value['description']} (with {$doctorType->title})"] = 0;
                    }

                    ++$services["{$value['description']} (with {$doctorType->title})"];
                }
            }
        }


        arsort($services);

        return $services;
    }

    function doctorsCount()
    {
        $count = [0, 0];

        $seenPatients = [];
        $currDate = Carbon::now();
        foreach ($this->completedAppointments() as $appointment) {
            $date = Carbon::parse("{$appointment->appointment_details['time']} {$appointment->appointment_details['start-time']}:00");

            if (!isset($seenPatients[$appointment->doctor->email])) {
                if ($date->month == $currDate->month) {
                    ++$count[1];
                }
                ++$count[0];
                $seenPatients[$appointment->doctor->email] = true;
            }
        }


        return $count;
    }

    public function todaysAppointments()
    {

        $today = [];

        foreach ($this->scheduledAppointments() as $appointment) {
            $currdate = Carbon::now();
            $date = Carbon::parse("{$appointment->appointment_details['time']} {$appointment->appointment_details['start-time']}:00");

            if (($currdate->month == $date->month)
                && ($currdate->day == $date->day)
                && ($currdate->year == $date->year)
            ) {
                array_push($today, $appointment);
            }
        }


        return $today;
    }

    function appointments()
    {
        return $this->hasMany(Appointment::class, 'patient_email', 'email');
    }

    function labResults()
    {
        return $this->hasMany(LabResult::class, 'patient_email', 'email');
    }

    function pendingAppointments()
    {
        return $this->appointments->where('status', 2);
    }

    function completedAppointments()
    {
        return $this->appointments->where('status', 1);
    }

    function scheduledAppointments()
    {
        return $this->appointments->where('status', 3);
    }
}
