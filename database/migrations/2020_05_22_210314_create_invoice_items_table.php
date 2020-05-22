<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateInvoiceItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoice_items', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('for_appointment')
                ->references('id')
                ->on('appointments');
            $table->string('description');
            $table->bigInteger('unit_price');
            $table->bigInteger('quantity');
            $table->bigInteger('total_price');
            $table->boolean('paid');
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
        Schema::dropIfExists('invoice_items');
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
