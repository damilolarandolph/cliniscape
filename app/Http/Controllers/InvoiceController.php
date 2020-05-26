<?php

namespace App\Http\Controllers;

use App\Appointment;
use Carbon\Carbon;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function show(Request $request)
    {
        $appointments = [];
        $userInfo = $request->attributes->get('userInfo');
        $appointments = $userInfo['user']->completedAppointments();

        if ($userInfo['isFinance']) {
            $appointments = Appointment::where('status', 1)->get();
        }

        if ($request->filled('id')) {
            $appointments = $appointments->where('id', $request->input('id'));
        }

        if ($request->filled('for') && !$userInfo['isPatient']) {
            $appointments = $appointments->where('patient_email', $request->input('for'));
        }

        if ($request->filled('by') && !$userInfo['isDoctor']) {
            $appointments = $appointments->where('docotor_email', $request->input('by'));
        }

        if ($request->filled('from')) {

            $appointments = $appointments->filter(function ($elem) use ($request) {
                return $elem->created_at->gte(Carbon::parse($request->input('from')));
            });
        }
        session()->flashInput($request->input());
        return view('invoices', [
            'appointments' => $appointments
        ]);
    }

    public function payInvoices(Request $request)
    {

        $payable = Appointment::find($request->input("appointment"))->invoiceItems->where('paid', false);

        if ($request->filled('all')) {
            foreach ($payable as $invoice) {
                $invoice->paid = true;
                $invoice->save();
            }
        } else {
            foreach ($payable as $invoice) {
                if ($request->filled("pay{$invoice->id}")) {
                    $invoice->paid = true;
                    $invoice->save();
                }
            }
        }

        return redirect()->back();
    }
}
