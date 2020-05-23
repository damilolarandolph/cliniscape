<?php

namespace App\Http\Controllers;

use App\MedicalSupply;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function medicalSupplies(Request $request)
    {
        return response()->json(MedicalSupply::all());
    }

    public function show(Request $request)
    {
        return view('manageinventory');
    }
}
