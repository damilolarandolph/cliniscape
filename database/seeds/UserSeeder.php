<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        DB::table('users')->truncate();

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $user = new App\User();
        $user->__constructWithItems('dami', 'damilolarandolph@gmail.com', 'test123', 1,);

        $user->save();

        $userDetails = [
            'basic_details' => [
                'avatar' => 'avatar/default.jpg',
            ]
        ];

        $user->userDetails()->create($userDetails);
    }
}
