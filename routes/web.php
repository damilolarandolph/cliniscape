<?php

use App\Appointment;
use App\Doctor;
use App\Http\Middleware\AddUserInfo;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/




Route::get('/login', "LoginController@login");

Route::post('/login', "LoginController@store");

Route::get('/doctorlogin', "LoginController@login");

Route::post('/doctorlogin', "DoctorLogin@login");

Route::get('/register', 'RegisterationController@register');

Route::post('/register', 'RegisterationController@store');

Route::middleware([AddUserInfo::class])->group(function () {
    Route::get('/', function () {
        return view('welcome');
    })->middleware('auth');

    Route::get('/managedoctors', function () {
        $doctorTypes = App\DoctorType::all();
        return view('admin.managedoctors', ['doctorTypes' => $doctorTypes]);
    });

    Route::post('/managedoctors', 'DoctorController@store');

    Route::get("/patientschedule", function (Request $request) {

        $email = $request->session()->get('email');
        $role = $request->session()->get('role');
        $class = null;
        $user = null;
        $isDoctor = false;
        if ($role == 3) {
            $class = User::class;
        } else {
            $class = Doctor::class;
            $isDoctor = true;
        }

        $user = $class::where('email', '=', $email)->first();

        return view('patient.schedule', ['user' => $user, 'isDoctor' => $isDoctor]);
    });

    Route::get('/makeappointment', function () {
        $physcians = App\DoctorTypeMap::whereHas('type', function ($q) {
            $q->where('id', '=', 1);
        })->get();

        $available_doctors = [];

        if (count($physcians) != 0)
            array_push($available_doctors, $physcians);
        return view('patient.makeappointment', ['doctors' => $available_doctors]);
    });

    Route::get('/medicalsupplies', 'InventoryController@medicalSupplies');

    Route::post('/addprescription', 'AppointmentController@addPrescription');

    Route::post('/addsupplies', 'AppointmentController@addSupplies');

    Route::post('/addservice', 'AppointmentController@addService');

    Route::post('/addschedule', "AppointmentController@addSchedule");

    Route::post('/addnote', "AppointmentController@addNote");

    Route::post('/finishappointment', "AppointmentController@finishAppointment");

    Route::post('/makeappointment', 'AppointmentController@store');

    Route::get('/pastappointments', 'AppointmentController@show');

    Route::get('/perscriptions', 'PerscriptionController@show');

    Route::post('/dispenseprescriptions', 'PerscriptionController@dispense');

    Route::get('/addlabresult', function () {
        $patients = App\User::where('account_type', '=', 3)->get();
        return view('addlabresult', ['patients' => $patients]);
    });

    Route::post('/addlabresult', "LabResultController@store");

    Route::get('/viewresults', "LabResultController@show");


    Route::get('/manageinventory', "InventoryController@show");
    Route::post('/addmedicalsupply', "InventoryController@addMedicalSupply");
    Route::post('/addmedicine', "InventoryController@addMedicine");

    Route::post('/editsupply', "InventoryController@editSupply");
    Route::post('/editmedicine', "InventoryController@editMedicine");
});
