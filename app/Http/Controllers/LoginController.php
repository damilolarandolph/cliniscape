<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator as FacadesValidator;

use function Utilities\emailExists;
use function Utilities\isCorrectPassword;

define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__ . "../../../utilities/database_helpers.php");

class LoginController extends Controller
{

    public function login()
    {
        return view('login');
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
                //ensures email is registered
                function ($attribute, $value, $fail) {
                    if (!emailExists($value)) {
                        $fail("Email not registered");
                    }
                }
            ],

            'password' => [
                //ensures password is a string
                'string',
                //ensures password is set
                'required'
            ]
        ]);

        $email = $request->input("email");
        $password = $request->input("password");

        //Checking if password is correct
        if (!$validator->fails()) {
            $validator->after(function ($validator) use ($email, $password) {
                if (!isCorrectPassword($email, $password)) {
                    $validator->errors()->add('password', 'Password is incorrect !');
                }
            });
        }

        if ($validator->fails()) {
            echo 'error';
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $user = User::where('email', '=', $email)->first();

        $account_type = $user->account_type;


        $request->session()->put('role', $account_type);
        $request->session()->put('email', $email);

        return redirect("/");
    }
}
