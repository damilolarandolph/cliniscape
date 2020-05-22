<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateMedicineInventoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('medicine_inventory', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('dosage');
            $table->bigInteger('quantity');
            $table->timestamps();
            $table->bigInteger('unit_price');
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
        Schema::dropIfExists('medicine_inventory');
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
