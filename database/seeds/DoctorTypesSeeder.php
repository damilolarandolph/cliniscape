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

        $doctorType = App\DoctorType::createMany(
            [
                'title' => 'Primary Care Doctor',
                'services_rendered' => [
                    [
                        'description' => 'Consultation',
                        'fee' => 100
                    ],
                    [
                        'description' => 'Vaccine Administration',
                        'fee' => 20
                    ],
                ]
            ],
            [
                'title' => 'Lab Director/Technician',
                'services_rendered' => [
                    [
                        'description' => 'Toxicology Report',
                        'fee' => 1000
                    ],
                    [
                        'description' => 'Chemistry Report',
                        'fee' => 1000
                    ],
                    [
                        'description' => 'Microbiology Report',
                        'fee' => 1000
                    ],
                    [
                        'description' => 'Immnue Report',
                        'fee' => 1000
                    ]
                ]
            ],
            [
                'title' => 'Infectious Diseases Doctor',
                'services_rendered' => [
                    [
                        'description' => 'HIV Consultation',
                        'fee' => 200
                    ],
                    [
                        'description' => 'Tuberculosis Consultation',
                        'fee' => 300
                    ],
                ]
            ],

            [
                'title' => 'Cardiologist',
                'services_rendered' => [
                    [
                        'description' => 'Echocardiogram',
                        'fee' => 1500
                    ],
                    [
                        'description' => 'Consultation',
                        'fee' => 500
                    ],
                    [
                        'description' => 'Chest X-Ray',
                        'fee' => 1500
                    ],
                    [
                        'description' => 'Cardiac Catheterization and Angiogram',
                        'fee' => 3000
                    ]
                ]
            ],

            [
                'title' => 'Pharmacist'
            ],

        );
    }
}
