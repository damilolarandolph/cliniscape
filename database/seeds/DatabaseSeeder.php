<?php


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $this->call([
            AccountTypeSeeder::class,
            UserSeeder::class,
            DoctorTypesSeeder::class
        ]);
    }
}


class AccountTypeSeeder extends Seeder
{

    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        DB::table('account_types')->truncate();

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $accountType = new App\AccountType();
        $accountType->type_description = 'admin';
        $accountType->save();

        $accountType = new App\AccountType();
        $accountType->type_description = 'staff';
        $accountType->save();

        $accountType = new App\AccountType();
        $accountType->type_description = 'patient';
        $accountType->save();
    }
}
