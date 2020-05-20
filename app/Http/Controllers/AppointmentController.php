<?php

namespace App\Http\Controllers;

use App\Appointment;
use App\Doctor;
use App\User;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{

    public function show(Request $request)
    {
        $isDoctor = ((int) $request->session()->get('role')) != 3 ? true : false;


        if ($isDoctor) {
            $class = Doctor::class;
        } else {
            $class = User::class;
        }


        $user =  $class::where('email', '=', $request->session()->get('email'))->first();


        return view(
            'patient.pastappointments',
            [
                'isDoctor' => $isDoctor,
                'user' => $user
            ]
        );
    }


    public function store(Request $request)
    {
        $doctor = Doctor::where('email', '=', $request->input('doctoremail'))->first();

        $service = $doctor
            ->typeMap
            ->type
            ->services_rendered[(int) $request->input('service')];
        $doctor->appointments()->create([
            'patient_email' => $request->session()->get('email'),
            'status' => 2,
            'appointment_details' => [
                'appointmentfor' => $service
            ]
        ]);

        return redirect()->back(200);
    }

    public function addSchedule(Request $request)
    {
        $appointment = Appointment::find($request->input('appointment'));
        $details = $appointment->appointment_details;
        $details['time'] = $request->input('date');
        $details['start-time'] = $request->input('start-time');
        $details['end-time'] = $request->input('end-time');
        $appointment->appointment_details = $details;
        $appointment->status = 3;
        $appointment->save();
        return redirect()->back();
    }

    public function addNote(Request $request)
    {
        $appointment = Appointment::find($request->input('appointment'));
        $details = $appointment->appointment_details;
        $note = $request->input('note');
        if (isset($details['notes'])) {
            array_push($details['notes'], $note);
        } else {
            $details['notes'] = [$note];
        }
        $appointment->appointment_details = $details;
        $appointment->save();
        return redirect()->back();
    }

    public function finishAppointment(Request $request)
    {
        $appointment = Appointment::find($request->input('appointment'));
        $appointment->status = 1;
        $appointment->save();
        return redirect()->back();
    }
}
