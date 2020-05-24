<?php

namespace App\Http\Controllers;

use App\Appointment;
use App\Doctor;
use App\Medicine;
use App\User;
use Illuminate\Http\Request;

class PerscriptionController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->session()->get('email');

        $isDoctor = $request->session()->get('role') == 2;

        $isPharma = false;

        if ($isDoctor)
            $class = Doctor::class;
        else
            $class = User::class;


        $user = $class::where('email', $user)->first();

        if ($isDoctor) {
            $isPharma = $user->typeMap->type->id == 5;
        }
        $results = [];
        if ($request->filled('for') && $request->filled('by')) {
            $results = Appointment::where('doctor_email', $request->input('by'))
                ->where('patient_email', $request->input('for'));
            $results = $results->get();
        } else if ($request->filled('for')) {
            $results = Appointment::where('patient_email', $request->input('for'));
            $results = $results->get();
        } else if ($request->filled('by')) {
            $results = Appointment::where('doctor_email', $request->input('by'));
            $results = $results->get();
        } else if ($isPharma) {
            $results = Appointment::all();
        } else {
            return redirect('/perscriptions?for=patient1@gmail.com');
        }


        return view('perscriptions', [
            'appointments' => $results,
            'isDoctor' => $isDoctor,
            'isPharma' => $isPharma
        ]);
    }

    public function dispense(Request $request)
    {
        $appointment = Appointment::find($request->input('appointment'));

        $prescriptions = $appointment->prescriptions->where('collected', false);


        foreach ($prescriptions as $prescription) {
            $shouldDispense = $request->filled("dispense{$prescription->id}");

            if ($shouldDispense) {
                $medicine = Medicine::where('name', $prescription->medicine_name)
                    ->where('dosage', $prescription->dosage)->first();
                $appointment->invoiceItems()->create(
                    [
                        'description' => "{$prescription->medicine_name} {$prescription->dosage}",
                        'unit_price' => $medicine->unit_price,
                        'quantity' => $prescription->quantity,
                        'total_price' => $medicine->unit_price * $prescription->quantity,
                        'paid' => false
                    ]

                );

                $prescription->collected = true;
                $prescription->save();
                $medicine->quantity = $medicine->quantity - $prescription->quantity;
                $medicine->save();
            }
        }

        return redirect()->back();
    }
}
