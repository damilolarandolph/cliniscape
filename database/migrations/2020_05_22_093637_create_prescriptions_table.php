<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreatePrescriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prescriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('for_appointment')
                ->references('id')
                ->on('appointments');
            $table->string('medicine_name');
            $table->string('dosage');
            $table->string('quantity');
            $table->string('instructions');
            $table->timestamps();
            $table->boolean('collected')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        // drop table
        Schema::dropIfExists('prescriptions');
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
