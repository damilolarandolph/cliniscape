<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DoctorTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        DB::table('doctor_types')->truncate();

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $doctorType = App\DoctorType::create([
            'title' => 'Physician',
            'description' => 'A simple physician',
            'services_rendered' => [
                'Consulation',
                'Treatment'
            ]
        ]);
    }
}
