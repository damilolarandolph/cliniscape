<?php

namespace App\Http\Controllers;

use App\Doctor;
use App\LabResult;
use App\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LabResultController extends Controller
{

    public function store(Request $request)
    {
        date_default_timezone_set('Africa/Accra');
        $dateString = date("h,i,d,m,Y");
        $dateString = explode(",", $dateString);
        $currentCreated = [
            "hour" => $dateString[0],
            "minute" => $dateString[1],
            "day" => $dateString[2],
            "month" => $dateString[3],
            "year" => $dateString[4]
        ];

        $doctor = Doctor::where('email', '=', $request
            ->session()
            ->get('email'))
            ->first();
        $patientEmail = $request->input('patientemail');
        $images = [];
        if ($request->hasFile('resultimages')) {
            foreach ($request->file('resultimages') as $file) {
                array_push($images, $file->store('labresults'));
            }
        }
        $sheetname = Str::random(10);
        Storage::put("sheets/{$sheetname}.json", $request->input('resultsheet'));
        $labresultDetails = [
            "date" => $currentCreated,
            "sheet" => "sheets/{$sheetname}.json",
            "images" => $images,
            "description" => $request->input('resultdescription'),
            "images" => $images,
            "title" => $request->input('resulttitle')
        ];

        $doctor->labResults()->create([
            "patient_email" => $patientEmail,
            "lab_result_details" => $labresultDetails
        ]);

        return redirect("/addlabresult");
    }

    public function show(Request $request)
    {

        $email = $request->session()->get('email');
        $isDoctor = $request->session()->get('role') == 2;

        $user = null;

        if ($isDoctor)
            $class = Doctor::class;
        else
            $class = User::class;

        $user = $class::where('email', $email)->first();
        $results = null;

        if ($request->filled('by') && $request->filled('for')) {

            $results = LabResult::where('doctor_email', $request->input('by'))
                ->where('patient_email', $request->input('for'));
        } else if ($request->filled('by')) {

            $results = LabResult::where('doctor_email', '=', $request->input('by'));
        } else if ($request->filled('for')) {

            $results = LabResult::where('patient_email', '=', $request->input('for'));
        } else {
            if ($isDoctor)
                return redirect("/viewresults?by={$email}");
            else
                return redirect("/viewresults?for={$email}");
        }

        if ($request->filled('searchterm')) {

            $searchTerm = "%" . str_replace(' ', '', $request->input('searchterm')) . "%";
            $results =  $results->whereRaw("lower(replace(lab_result_details->'$.title',' ', '')) like (?)", [$searchTerm]);
        }

        $results = $results->get();


        $patients = [];
        $doctors = [];

        if ($isDoctor) {
            $patients = User::all()->pluck('email')->all();
        } else {
            $doctors = $user->labResults->all()->pluck('email')->all();
        }

        session()->flashInput($request->input());

        return view('viewlabresults', [
            'isDoctor' => $isDoctor,
            'results' => $results,
            'user' => $user,
            'patients' => $patients,
            'doctors' => $doctors

        ]);
    }
}
