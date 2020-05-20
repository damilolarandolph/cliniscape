<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDoctorTypeMap extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doctor_types_map', function (Blueprint $table) {
            $table->id();
            $table->string('doctor_email');
            $table->foreignId("doctor_type_id")
                ->references('id')
                ->on("doctor_types");
            $table->foreign("doctor_email")->references('email')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('doctor_types_map');
    }
}
