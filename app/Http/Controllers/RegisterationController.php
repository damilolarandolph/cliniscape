<?php

namespace App\Http\Controllers;

use App\User;
use App\UserDetails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator as FacadesValidator;

use function Utilities\emailExists;

define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__ . "../../../utilities/database_helpers.php");

class RegisterationController extends Controller
{
    public function register()
    {
        return view('register');
    }

    public function store(Request $request)
    {
        $validator = FacadesValidator::make($request->all(), [
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
            'account_type' => 3,
            'password' => Hash::make($request->input('password')),


        ];

        $avatar = 'images/default.jpg';

        if ($request->hasFile('avatar')) {
            $avatar =  $request->file('avatar')->store('avatars');
        }

        $userDetails = [
            'basic_details' => [
                'avatar' =>  $avatar,
                'firstname' => $request->input('firstname'),
                'lastname' => $request->input('lastname'),
                'dob' => $request->input('dob'),
                'gender' => $request->input('gender'),
                'title' => $request->input('title')
            ],

            'extended_details' => [
                'address' => $request->input('address1'),
                'address2' => $request->input('address2'),
                'phonenumber' => $request->input('phonenumber'),
                'city' => $request->input('city'),
                'region' => $request->input('region')

            ]
        ];

        $user = User::create($userData);
        $user->userDetails()->create($userDetails);
        return redirect('/login');
    }
}
