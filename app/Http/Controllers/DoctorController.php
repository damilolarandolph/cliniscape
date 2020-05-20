<?php

namespace App\Http\Controllers;

use App\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use function Utilities\emailExists;
use function Utilities\isCorrectPassword;

define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__ . "../../../utilities/database_helpers.php");

class DoctorController extends Controller
{

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => [
                //ensures email is a string
                'string',
                //ensures email is set
                'required',
                //ensures email is an email string
                'email:rfc',
                //ensures email is not registered
                function ($attribute, $value, $fail) {
                    if (emailExists($value)) {
                        $fail("Email is already registered");
                    }
                }
            ],

            'firstname' => [
                'string',
                'required'
            ],

            'lastname' => [
                'string',
                'required'
            ],

            'dob' => [
                'required'
            ],

            'password' => [
                //ensures password is a string
                'string',
                //ensures password is set
                'required'
            ]
        ]);

        if ($validator->fails()) {
            echo 'error';
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $userData = [
            'email' => $request->input('email'),
            'name' => $request->input('firstname'),
            'account_type' => 2,
            'password' => Hash::make($request->input('password')),


        ];

        $userDetails = [
            'basic_details' => [
                'avatar' => 'images/default.jpg',
                'firstname' => $request->input('firstname'),
                'lastname' => $request->input('lastname'),
                'dob' => $request->input('dob'),
                'gender' => $request->input('gender'),
                'title' => 'Dr'
            ]
        ];

        $doctor = Doctor::create($userData);
        $doctor->userDetails()->create($userDetails);
        $doctor->typeMap()->create(['doctor_type_id' => $request->input('doctortype')]);
        return redirect()->back();
    }
}
