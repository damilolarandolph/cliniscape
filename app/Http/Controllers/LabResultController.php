<?php

namespace App\Http\Controllers;

use App\Doctor;
use Illuminate\Http\Request;

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
        $labresultDetails = [
            "date" => $currentCreated,
            "sheet" => $request->input('resultsheet'),
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



        return view('viewlabresults');
    }
}
