<?php

namespace App\Http\Controllers;

use App\Appointment;
use App\Doctor;
use App\InvoiceItem;
use App\MedicalSupply;
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

        $doctor->appointments()->create([
            'patient_email' => $request->session()->get('email'),
            'status' => 2,
            'appointment_details' => []
        ]);

        return redirect()->back();
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

    public function addPrescription(Request $request)
    {
        $prescriptions = json_decode($request->input('prescriptions'));
        $appointment = $request->input('appointment');
        $appointment = Appointment::find($appointment);

        foreach ($prescriptions as $prescription) {
            $appointment->prescriptions()->create([
                'medicine_name' => $prescription->drug_name,
                'dosage' => $prescription->strength,
                'quantity' => $prescription->quantity,
                'instructions' => $prescription->instructions
            ]);
        }

        return redirect()->back();
    }

    public function addSupplies(Request $request)
    {
        $supplies = json_decode($request->input('supplies'));
        $appointment = $request->input('appointment');
        $appointment = Appointment::find($appointment);
        $appointmentDetails = $appointment->appointment_details;
        if (!isset($appointmentDetails->supplies))
            $appointmentDetails->supplies = [];

        foreach ($supplies as $supply) {
            $supplyDetails = [
                'id' => $supply->id,
                'quantity' => $supply->quantity
            ];

            array_push($appointmentDetails->supplies, $supplyDetails);
        }

        $appointment->appointment_details = $appointmentDetails;
        $appointment->save();
    }

    public function addService(Request $request)
    {
        $service = $request->input('service');
        $appointment = $request->input(('appointment'));
        $appointment = Appointment::find($appointment);
        $appointmentDetails = $appointment->appointment_details;
        if (!isset($appointmentDetails['services']))
            $appointmentDetails['services'] = [];

        array_push($appointmentDetails['services'], $service);

        $appointment->appointment_details = $appointmentDetails;
        $appointment->save();
        return redirect()->back();
    }

    public function finishAppointment(Request $request)
    {
        $appointment = Appointment::find($request->input('appointment'));
        $appointment->status = 1;
        if (isset($appointment->appointment_details['services'])) {
            foreach ($appointment->appointment_details['services'] as $service) {
                $serviceItem = $appointment
                    ->doctord
                    ->typeMap
                    ->type
                    ->services_rendered[(int) $service];
                $appointment->invoiceItems()->create(
                    [
                        'description' => $serviceItem['description'],
                        'unit_price' => $serviceItem['fee'],
                        'quantity' => 0,
                        'total_price' => $serviceItem['fee'],
                        'paid' => false
                    ]
                );
            }
        }

        if (isset($appointment->appointment_details['supplies'])) {
            foreach ($appointment->appointment_details['supplies'] as $supply) {
                $supplyItem = MedicalSupply::find($supply['id']);

                $appointment->invoiceItems()->create(
                    [
                        'description' => $supplyItem['name'],
                        'unit_price' => $supplyItem['unit_price'],
                        'quantity' => $supply['quantity'],
                        'total_price' => ((int) $supply['quantity']) * $supplyItem['unit_price'],
                        'paid' => false
                    ]
                );

                $supplyItem->quantity = $supplyItem->quantity - $supply['quantity'];
                $supplyItem->save();
            }
        }

        $appointment->save();
        return redirect()->back();
    }
}
