<?php

namespace App\Http\Controllers;

use App\MedicalSupply;
use App\Medicine;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function medicalSupplies(Request $request)
    {
        return response()->json(MedicalSupply::all());
    }

    public function show(Request $request)
    {

        if ($request->filled('medicineterm')) {
            $searchTerm = "%" . str_replace(' ', '', $request->input('medicineterm')) . "%";
            $medicines = Medicine::whereRaw("lower(replace(name,' ','')) like (?)", [$searchTerm])->get();
        } else {
            $medicines = Medicine::all();
        }

        if ($request->filled('supplyterm')) {
            $searchTerm = "%" . str_replace(' ', '', $request->input('supplyterm')) . "%";
            $supplies = MedicalSupply::whereRaw("lower(replace(name,' ','')) like (?)", [$searchTerm])->get();
        } else {
            $supplies = MedicalSupply::all();
        }

        session()->flashInput($request->input());

        return view('manageinventory', [
            'supplies' => $supplies,
            'medicines' => $medicines
        ]);
    }

    public function editSupply(Request $request)
    {
        $supply = MedicalSupply::find($request->input('supply-id'));
        if ($request->filled('price')) {
            $supply->unit_price = $request->input('price');
        }

        if ($request->filled('quantity')) {
            $supply->quantity = $supply->quantity + $request->input('quantity');
        }

        $supply->save();
        return redirect()->back();
    }

    public function editMedicine(Request $request)
    {
        $supply = Medicine::find($request->input('drug-id'));

        if ($request->filled('price')) {
            $supply->unit_price = $request->input('price');
        }

        if ($request->filled('quantity')) {
            $supply->quantity = $supply->quantity + $request->input('quantity');
        }

        $supply->save();
        return redirect()->back();
    }

    public function addMedicalSupply(Request $request)
    {
        MedicalSupply::create(
            [
                'name' => $request->input('supply'),
                'unit_price' => $request->input('price'),
                'quantity' => $request->input('quantity')
            ]
        );
        return redirect()->back();
    }

    public function addMedicine(Request $request)
    {
        Medicine::create(
            [
                'name' => $request->input('drug'),
                'dosage' => $request->input('dosage'),
                'unit_price' => $request->input('price'),
                'quantity' => $request->input('quantity')
            ]
        );

        return redirect()->back();
    }
}
